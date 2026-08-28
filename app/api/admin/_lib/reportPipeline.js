// Shared report-generation pipeline, used by both the real order flow
// (/api/admin/generate-report) and the keyword-only demo tool
// (/api/admin/generate-report-demo). Keep this the single source of truth
// for scoring/labeling/AI-prompt logic so the two entry points can't drift.

export function activityLabel(postsPerDay) {
  if (postsPerDay == null) return "Unknown";
  if (postsPerDay >= 10) return "Active";
  if (postsPerDay >= 2) return "Moderate";
  return "Dull";
}

export function moderationLabel(removalRatePercent, taggedRules) {
  const rules = taggedRules || [];
  const hasBlocking = rules.some(function (r) {
    return r.severity === "blocking";
  });
  const rate = removalRatePercent || 0;
  if (rate >= 50 || (hasBlocking && rate >= 25)) return "Strict";
  if (rate >= 20) return "Moderate";
  return "Relaxed";
}

export function opportunityScore(params) {
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

export async function checkGoogleRanking(keyword) {
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

export function findSubredditInGoogleResults(subredditName, googleResults) {
  const nameLower = subredditName.toLowerCase();
  const match = googleResults.find(function (result) {
    return result.url.toLowerCase().includes("/r/" + nameLower + "/");
  });
  return match || null;
}

export async function classifyQuestionsAnglesCompetitors(keyword, subredditBlocks, competitors) {
  const promptLines = [];
  promptLines.push(
    'For the keyword/topic "' + keyword + '", you will be given real Reddit post ' +
    "titles from several subreddits. For each subreddit, do three things:\n" +
    "1. Classify each post title's intent as exactly one of: BUYING, DISCUSSION, or CURIOSITY\n" +
    "2. Write one short sentence suggesting what kind of post/comment would land well in that subreddit\n"
  );

  if (competitors && competitors.length > 0) {
    promptLines.push(
      "3. Based on the post titles, note whether any of these competitor names/brands are " +
      "mentioned: " + competitors.join(", ") + ". Answer YES or NO.\n"
    );
  } else {
    promptLines.push("3. Skip this step (no competitors provided). Just answer NO.\n");
  }

  promptLines.push("");

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
    "COMPETITOR: YES or NO\n" +
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
        max_tokens: 2500,
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

      const competitorMatch = block.match(/COMPETITOR:\s*(YES|NO)/i);
      const competitorMentioned = competitorMatch ? competitorMatch[1].toUpperCase() === "YES" : false;

      results[name.toLowerCase()] = { intents: intents, angle: angle, competitorMentioned: competitorMentioned };
    });

    return results;
  } catch (e) {
    return {};
  }
}

export async function writeStrategyNarrative(keyword, rankedSubreddits, competitors) {
  const lines = rankedSubreddits.map(function (s, i) {
    return (
      (i + 1) + ". r/" + s.subreddit +
      " - opportunity score " + s.opportunityScore +
      ", " + s.activityLabel.toLowerCase() + " activity" +
      ", " + s.moderationLabel.toLowerCase() + " moderation" +
      (s.competitorMentioned ? ", COMPETITOR MENTIONED HERE" : "") +
      (s.googleRanking && s.googleRanking.ranking ? ", ranks on Google" : "")
    );
  });

  const promptLines = [];
  promptLines.push(
    'You are writing the "Strategy" section of a Reddit placement report for the keyword "' +
    keyword + '". Below is the ranked list of subreddits with their computed facts.'
  );
  promptLines.push("");
  promptLines.push(lines.join("\n"));
  promptLines.push("");
  if (competitors && competitors.length > 0) {
    promptLines.push("Competitors being tracked: " + competitors.join(", "));
    promptLines.push("");
  }
  promptLines.push(
    "Write a short strategy narrative (3 short paragraphs, plain prose, no headers) that:\n" +
    "1. Names the top 2-3 priority subreddits and why (using only the facts given)\n" +
    "2. Notes any subreddits to warm up in or approach carefully (moderate/strict moderation)\n" +
    "3. Mentions competitor presence only if it was flagged above, and what that means practically\n\n" +
    "Do not invent any numbers or facts not given above. Write directly to the customer, second person."
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
        max_tokens: 600,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) return "";

    const data = await res.json();
    return data.content && data.content[0] && data.content[0].text
      ? data.content[0].text.trim()
      : "";
  } catch (e) {
    return "";
  }
}

// Runs the full candidate-discovery -> classification -> scoring -> narrative
// pipeline for a keyword and returns the report payload shape shared by both
// callers. Does not touch orderId/users/orders at all — callers attach
// whatever order context (or lack of it) is appropriate for them.
export async function buildReport({ keyword, competitors, baseUrl }) {
  const candidatesRes = await fetch(
    baseUrl + "/api/report-candidates?keyword=" + encodeURIComponent(keyword) + "&target=15"
  );
  if (!candidatesRes.ok) {
    const errText = await candidatesRes.text();
    const err = new Error("Candidate fetch failed");
    err.status = candidatesRes.status;
    err.details = errText.slice(0, 500);
    throw err;
  }
  const candidatesData = await candidatesRes.json();
  const qualified = candidatesData.qualified || [];

  if (qualified.length === 0) {
    return {
      keyword: keyword,
      generatedAt: new Date().toISOString(),
      competitors: competitors,
      subreddits: [],
      strategy: { narrative: "No qualifying subreddits were found for this keyword." },
    };
  }

  const googleResultsPromise = checkGoogleRanking(keyword);

  const subredditBlocks = qualified.map(function (c) {
    const titles = c.data && c.data.evidence
      ? c.data.evidence.map(function (e) { return e.title; })
      : [];
    return { subreddit: c.subreddit, titles: titles };
  });
  const classificationPromise = classifyQuestionsAnglesCompetitors(keyword, subredditBlocks, competitors);

  const [googleResults, classifications] = await Promise.all([
    googleResultsPromise,
    classificationPromise,
  ]);

  const maxMentions = Math.max.apply(null, qualified.map(function (c) { return c.mentions; }));

  const subreddits = qualified.map(function (c) {
    const d = c.data;
    const googleMatch = findSubredditInGoogleResults(c.subreddit, googleResults);
    const classification = classifications[c.subreddit.toLowerCase()] || { intents: [], angle: "", competitorMentioned: false };

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

    const identity = d && d.identity ? d.identity : {};
    const postsPerDay = identity.postsPerDay;
    const removalRatePercent = d && d.removalRisk ? d.removalRisk.removalRatePercent : 0;
    const taggedRules = d && d.gates ? d.gates.rules : [];
    const detected = d && d.gates ? d.gates.detected : {};

    return {
      subreddit: c.subreddit,
      mentions: c.mentions,
      subscribers: identity.subscribers != null ? identity.subscribers : null,
      description: identity.description || null,
      ageDays: identity.ageDays != null ? identity.ageDays : null,
      postsPerDay: postsPerDay != null ? postsPerDay : null,
      commentsPerDay: identity.commentsPerDay != null ? identity.commentsPerDay : null,
      activityLabel: activityLabel(postsPerDay),
      moderationLabel: moderationLabel(removalRatePercent, taggedRules),
      removalRatePercent: removalRatePercent,
      karmaRequired: Boolean(detected.mentionsKarmaMinimum),
      accountAgeRequired: Boolean(detected.mentionsAccountAge),
      googleRanking: googleMatch ? { ranking: true, url: googleMatch.url } : { ranking: false },
      opportunityScore: opportunityScore({
        removalRatePercent: removalRatePercent,
        postsPerDay: postsPerDay,
        googleRanking: Boolean(googleMatch),
        mentions: c.mentions,
        maxMentions: maxMentions,
      }),
      competitorMentioned: classification.competitorMentioned,
      suggestedAngle: classification.angle,
      questions: questions,
      verdict: d && d.verdict ? d.verdict : null,
      traction: d && d.traction ? d.traction : null,
      timing: d && d.timing ? d.timing : null,
      flair: d && d.flair ? d.flair : null,
      format: d && d.format ? d.format : null,
      rawGates: d && d.gates ? d.gates : null,
    };
  });

  const ranked = [...subreddits].sort(function (a, b) {
    return b.opportunityScore - a.opportunityScore;
  });

  const narrative = await writeStrategyNarrative(keyword, ranked, competitors);

  return {
    keyword: keyword,
    generatedAt: new Date().toISOString(),
    competitors: competitors,
    subreddits: ranked,
    strategy: { narrative: narrative },
  };
}
