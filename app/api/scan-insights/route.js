function activityLabel(postsPerDay) {
  if (postsPerDay == null) return "Unknown";
  if (postsPerDay >= 10) return "Active";
  if (postsPerDay >= 2) return "Moderate";
  return "Dull";
}

function moderationLabel(removalRatePercent, taggedRules) {
  const rules = taggedRules || [];
  const hasBlocking = rules.some(function (r) {
    return r.severity === "blocking";
  });
  const rate = removalRatePercent || 0;
  if (rate >= 50 || (hasBlocking && rate >= 25)) return "Strict";
  if (rate >= 20) return "Moderate";
  return "Relaxed";
}

function opportunityScore(params) {
  const removalRatePercent = params.removalRatePercent || 0;
  const postsPerDay = params.postsPerDay || 0;
  const googleRanking = params.googleRanking;
  const mentions = params.mentions || 0;
  const maxMentions = params.maxMentions || 1;

  const removalComponent = Math.max(0, 35 - removalRatePercent * 0.35);
  const activityComponent = Math.min(25, postsPerDay * 2);
  const googleComponent = googleRanking ? 20 : 0;
  const mentionsComponent = Math.round((mentions / maxMentions) * 20);

  const total = removalComponent + activityComponent + googleComponent + mentionsComponent;
  return Math.max(0, Math.min(100, Math.round(total)));
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

async function classifyQuestionsAndAngles(keyword, subredditBlocks) {
  const promptLines = [];
  promptLines.push(
    'For the keyword/topic "' + keyword + '", you will be given real Reddit post ' +
    "titles from several subreddits. For each subreddit, do two things:\n" +
    "1. Classify each post title's intent as exactly one of: BUYING, DISCUSSION, or CURIOSITY\n" +
    "   - BUYING: the poster is looking to purchase, comparing options, or asking what to buy\n" +
    "   - DISCUSSION: the poster is sharing an opinion or debating something\n" +
    "   - CURIOSITY: the poster is asking how something works or seeking general info\n" +
    "2. Write one short sentence suggesting what kind of post/comment would land well in that subreddit\n\n"
  );

  subredditBlocks.forEach(function (block, i) {
    promptLines.push("SUBREDDIT " + (i + 1) + ": r/" + block.subreddit);
    block.titles.forEach(function (title, j) {
      promptLines.push("  Post " + (j + 1) + ": " + title);
    });
    promptLines.push("");
  });

  promptLines.push(
    "Respond in exactly this format, one block per subreddit, nothing else:\n" +
    "SUBREDDIT: <name>\n" +
    "1: BUYING or DISCUSSION or CURIOSITY\n" +
    "2: BUYING or DISCUSSION or CURIOSITY\n" +
    "(one numbered line per post, matching the order given)\n" +
    "ANGLE: <one sentence>\n" +
    "---"
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
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) return {};

    const data = await res.json();
    const text = data.content && data.content[0] && data.content[0].text
      ? data.content[0].text
      : "";

    const results = {};
    const blocks = text.split("---");

    blocks.forEach(function (block) {
      const nameMatch = block.match(/SUBREDDIT:\s*(\S+)/i);
      if (!nameMatch) return;
      const name = nameMatch[1].replace(/^r\//i, "").trim();

      const intents = [];
      const lineMatches = block.matchAll(/^\s*\d+:\s*(BUYING|DISCUSSION|CURIOSITY)/gim);
      for (const m of lineMatches) {
        intents.push(m[1].toUpperCase());
      }

      const angleMatch = block.match(/ANGLE:\s*(.+)/i);
      const angle = angleMatch ? angleMatch[1].trim() : "";

      results[name.toLowerCase()] = { intents: intents, angle: angle };
    });

    return results;
  } catch (e) {
    return {};
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return Response.json({ error: "Missing keyword" }, { status: 400 });
  }

  try {
    const baseUrl = new URL(request.url).origin;

    // Forward the caller's session cookie so /api/scan can identify the
    // logged-in user and save this scan to their dashboard history — this
    // is a server-to-server fetch, which does not carry cookies unless
    // explicitly passed through.
    const scanRes = await fetch(
      baseUrl + "/api/scan?keyword=" + encodeURIComponent(keyword),
      { headers: { cookie: request.headers.get("cookie") || "" } }
    );
    if (!scanRes.ok) {
      return Response.json({ error: "Scan failed" }, { status: 500 });
    }
    const scanData = await scanRes.json();
    const topFive = scanData.results || [];

    if (topFive.length === 0) {
      return Response.json({ keyword: keyword, subreddits: [] });
    }

    const detailPromises = topFive.map(function (r) {
      return fetch(baseUrl + "/api/subreddit?subreddit=" + encodeURIComponent(r.subreddit))
        .then(function (res) {
          return res.ok ? res.json() : null;
        })
        .catch(function () {
          return null;
        });
    });
    const details = await Promise.all(detailPromises);

    const googleResultsPromise = checkGoogleRanking(keyword);

    const subredditBlocks = topFive.map(function (r, i) {
      const d = details[i];
      const titles = d && d.evidence ? d.evidence.map(function (e) { return e.title; }) : [];
      return { subreddit: r.subreddit, titles: titles };
    });
    const classificationPromise = classifyQuestionsAndAngles(keyword, subredditBlocks);

    const [googleResults, classifications] = await Promise.all([
      googleResultsPromise,
      classificationPromise,
    ]);

    const maxMentions = Math.max.apply(null, topFive.map(function (r) { return r.mentions; }));

    const subreddits = topFive.map(function (r, i) {
      const d = details[i];
      const googleMatch = findSubredditInGoogleResults(r.subreddit, googleResults);
      const classification = classifications[r.subreddit.toLowerCase()] || { intents: [], angle: "" };

      const evidence = d && d.evidence ? d.evidence : [];
      const questions = evidence.map(function (e, j) {
        return {
          title: e.title,
          url: e.url,
          score: e.score,
          comments: e.comments,
          intent: classification.intents[j] || "DISCUSSION",
        };
      });

      const postsPerDay = d && d.identity ? d.identity.postsPerDay : null;
      const removalRatePercent = d && d.removalRisk ? d.removalRisk.removalRatePercent : 0;
      const taggedRules = d && d.gates ? d.gates.rules : [];
      const detected = d && d.gates ? d.gates.detected : {};

      return {
        subreddit: r.subreddit,
        mentions: r.mentions,
        subscribers: d && d.identity ? d.identity.subscribers : null,
        activityLabel: activityLabel(postsPerDay),
        moderationLabel: moderationLabel(removalRatePercent, taggedRules),
        removalRatePercent: removalRatePercent,
        karmaRequired: Boolean(detected.mentionsKarmaMinimum),
        accountAgeRequired: Boolean(detected.mentionsAccountAge),
        googleRanking: googleMatch
          ? { ranking: true, url: googleMatch.url }
          : { ranking: false },
        opportunityScore: opportunityScore({
          removalRatePercent: removalRatePercent,
          postsPerDay: postsPerDay,
          googleRanking: Boolean(googleMatch),
          mentions: r.mentions,
          maxMentions: maxMentions,
        }),
        suggestedAngle: classification.angle,
        questions: questions,
        verdict: d && d.verdict ? d.verdict : null,
      };
    });

    return Response.json({ keyword: keyword, subreddits: subreddits });
  } catch (error) {
    return Response.json(
      { error: "Scan insights failed", details: error.message },
      { status: 500 }
    );
  }
}
