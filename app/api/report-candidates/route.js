async function fetchSubredditData(subreddit, baseUrl) {
  const res = await fetch(
    baseUrl + "/api/subreddit?subreddit=" + encodeURIComponent(subreddit)
  );
  if (!res.ok) return null;
  return res.json();
}

function qualifies(data) {
  if (!data || !data.identity) return false;
  const subscribers = data.identity.subscribers || 0;
  const postsPerDay = data.identity.postsPerDay || 0;
  const modApprovalRequired = data.gates?.detected?.mentionsModApproval || false;

  return subscribers >= 1000 && postsPerDay >= 1 && !modApprovalRequired;
}

async function checkRelevance(keyword, subredditName, data) {
  const description = data.identity?.description || "";
  const evidenceTitles = (data.evidence || []).map(function (p) { return p.title; }).slice(0, 5);

  const promptLines = [];
  promptLines.push('Keyword/topic: "' + keyword + '"');
  promptLines.push("Subreddit: r/" + subredditName);
  promptLines.push("Subreddit description: " + description);
  promptLines.push("Recent top post titles:");
  for (const t of evidenceTitles) {
    promptLines.push("- " + t);
  }
  promptLines.push("");
  promptLines.push(
    "Answer two separate questions about this subreddit, each strictly YES or NO, on two lines:\n" +
    "LINE 1 (relevance): Is this subreddit genuinely about the real-world topic behind the keyword above " +
    "(not just a coincidental word match, e.g. a game term or unrelated slang that happens to share the word)? " +
    "Would a business selling something related to this keyword realistically want to post here?\n" +
    "LINE 2 (nsfw): Is this subreddit NSFW / adult content / sexual in nature, based on its description or post titles?\n\n" +
    "Respond in exactly this format, nothing else:\n" +
    "RELEVANT: YES or NO\n" +
    "NSFW: YES or NO"
  );
  const prompt = promptLines.join("\n");

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 20,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      return { relevant: true, nsfw: false };
    }

    const resultData = await res.json();
    const text = (resultData.content && resultData.content[0] && resultData.content[0].text
      ? resultData.content[0].text
      : ""
    ).toUpperCase();

    const relevantMatch = text.match(/RELEVANT:\s*(YES|NO)/);
    const nsfwMatch = text.match(/NSFW:\s*(YES|NO)/);

    return {
      relevant: relevantMatch ? relevantMatch[1] === "YES" : true,
      nsfw: nsfwMatch ? nsfwMatch[1] === "YES" : false,
    };
  } catch (e) {
    return { relevant: true, nsfw: false };
  }
}

async function generateRelatedTerms(keyword) {
  const prompt =
    'You are helping find additional Reddit search terms related to the keyword/topic: "' +
    keyword + '".\n\n' +
    "Generate 5 related search terms or short phrases that a real audience interested in this " +
    "topic would also search for or discuss on Reddit — genuinely adjacent terms (related " +
    "products, common subtopics, specific problems or questions in this space, or how real people " +
    "actually phrase things), not just synonyms of the exact keyword. Keep each term short " +
    "(1-4 words), suitable as a Reddit search query on its own.\n\n" +
    "Respond with exactly 5 lines, one term per line, nothing else — no numbering, no bullets, " +
    "no explanation.";

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 150,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) return [];

    const data = await res.json();
    const text = data.content && data.content[0] && data.content[0].text
      ? data.content[0].text
      : "";

    return text
      .split("\n")
      .map(function (line) {
        return line.replace(/^[\s\-*\d.]+/, "").trim();
      })
      .filter(Boolean)
      .slice(0, 5);
  } catch (e) {
    return [];
  }
}

async function checkGoogleRanking(keyword) {
  try {
    const url =
      "https://www.googleapis.com/customsearch/v1?" +
      new URLSearchParams({
        key: process.env.GOOGLE_SEARCH_API_KEY,
        cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
        q: keyword,
        num: "10",
      }).toString();

    const res = await fetch(url);
    if (!res.ok) return [];

    const data = await res.json();
    const items = data.items || [];

    return items.map(function (item) {
      return { url: item.link, title: item.title };
    });
  } catch (e) {
    return [];
  }
}

function findSubredditInGoogleResults(subredditName, googleResults) {
  const nameLower = subredditName.toLowerCase();
  const match = googleResults.find(function (result) {
    return result.url.toLowerCase().includes("/r/" + nameLower + "/");
  });
  return match || null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  const target = parseInt(searchParams.get("target") || "15", 10);

  if (!keyword) {
    return Response.json({ error: "Missing keyword" }, { status: 400 });
  }

  try {
    const baseUrl = new URL(request.url).origin;

    // Original keyword scan runs first and its failure is still fatal (same
    // behavior as before) — everything downstream depends on at least this
    // one search succeeding.
    const scanRes = await fetch(
      baseUrl + "/api/scan?keyword=" + encodeURIComponent(keyword)
    );
    if (!scanRes.ok) {
      const errText = await scanRes.text();
      return Response.json(
        { error: "Scan failed", details: errText.slice(0, 500) },
        { status: 500 }
      );
    }
    const scanData = await scanRes.json();

    // Multi-query expansion: a single 100-post Reddit search caps out fast
    // for broad keywords. Ask Claude for related terms a real audience in
    // this niche would also search/discuss, then run the same /api/scan
    // search for each one, sequentially (to avoid hammering the shared
    // rate-limited pool behind /api/scan's retry logic with concurrent
    // requests) and merge the candidate pools together.
    const relatedTerms = await generateRelatedTerms(keyword);
    const queriesUsed = [keyword];
    const scansByQuery = [{ query: keyword, candidates: scanData.extended || [] }];

    for (const term of relatedTerms) {
      try {
        const r = await fetch(baseUrl + "/api/scan?keyword=" + encodeURIComponent(term));
        if (r.ok) {
          const d = await r.json();
          queriesUsed.push(term);
          scansByQuery.push({ query: term, candidates: d.extended || [] });
        }
      } catch (e) {
        // A related-term search failing shouldn't sink the whole request —
        // just skip it and keep going with whatever queries did succeed.
      }
    }

    // Dedupe across all query variations into one merged pool. A subreddit
    // that clusters under multiple related terms is a stronger relevance
    // signal, so it's tracked (queryHitCount/matchedQueries) and sorted to
    // the front — not used in scoring yet, just preserved for later.
    const mergedBySubreddit = new Map();
    for (const scan of scansByQuery) {
      for (const c of scan.candidates) {
        const key = c.subreddit.toLowerCase();
        if (!mergedBySubreddit.has(key)) {
          mergedBySubreddit.set(key, {
            subreddit: c.subreddit,
            mentions: 0,
            queryHitCount: 0,
            matchedQueries: [],
          });
        }
        const entry = mergedBySubreddit.get(key);
        entry.mentions += c.mentions;
        entry.queryHitCount += 1;
        entry.matchedQueries.push(scan.query);
      }
    }

    const candidates = Array.from(mergedBySubreddit.values()).sort(function (a, b) {
      if (b.queryHitCount !== a.queryHitCount) return b.queryHitCount - a.queryHitCount;
      return b.mentions - a.mentions;
    });

    const qualified = [];
    const disqualified = [];

    for (const candidate of candidates) {
      if (qualified.length >= target) {
        break;
      }

      const data = await fetchSubredditData(candidate.subreddit, baseUrl);

      if (!qualifies(data)) {
        let reason = "mod-approval required";
        if (!data) {
          reason = "lookup failed";
        } else if (!data.identity) {
          reason = "no identity data";
        } else if ((data.identity.subscribers || 0) < 1000) {
          reason = "too small";
        } else if ((data.identity.postsPerDay || 0) < 1) {
          reason = "inactive";
        }
        disqualified.push({ subreddit: candidate.subreddit, reason: reason });
        continue;
      }

      const relevanceResult = await checkRelevance(keyword, candidate.subreddit, data);
      if (!relevanceResult.relevant) {
        disqualified.push({ subreddit: candidate.subreddit, reason: "not topically relevant" });
        continue;
      }
      if (relevanceResult.nsfw) {
        disqualified.push({ subreddit: candidate.subreddit, reason: "NSFW content" });
        continue;
      }

      qualified.push({
        subreddit: candidate.subreddit,
        mentions: candidate.mentions,
        queryHitCount: candidate.queryHitCount,
        matchedQueries: candidate.matchedQueries,
        data: data,
      });
    }

    const googleResults = await checkGoogleRanking(keyword);

    const qualifiedWithGoogle = qualified.map(function (candidate) {
      const googleMatch = findSubredditInGoogleResults(candidate.subreddit, googleResults);
      return {
        ...candidate,
        googleRanking: googleMatch
          ? { ranking: true, url: googleMatch.url, title: googleMatch.title }
          : { ranking: false },
      };
    });

    return Response.json({
      keyword: keyword,
      queriesUsed: queriesUsed,
      candidatePoolSize: candidates.length,
      qualifiedCount: qualifiedWithGoogle.length,
      qualified: qualifiedWithGoogle,
      disqualified: disqualified,
    });
  } catch (error) {
    return Response.json(
      { error: "Candidate selection failed", details: error.message },
      { status: 500 }
    );
  }
}
