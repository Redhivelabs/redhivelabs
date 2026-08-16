function median(numbers) {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function percentile(numbers, p) {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, Math.min(index, sorted.length - 1))];
}

function isRemoved(post) {
  const cat = post.removed_by_category;
  const validCategory = cat && cat !== "null" && cat !== "";
  const removedText = post.selftext === "[removed]" || post.selftext === "[deleted]";
  return Boolean(validCategory) || removedText;
}

function getPostType(post) {
  if (post.is_self) return "text";
  if (post.is_video) return "video";
  const url = post.url || "";
  if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) return "image";
  return "link";
}

function classifyRuleSeverity(text) {
  const lower = text.toLowerCase();
  if (/\bban(ned)?\b|zero tolerance|immediate(ly)? removed|permanent/.test(lower)) {
    return "blocking";
  }
  if (/\bmust\b|\brequired\b|will be removed|not allowed/.test(lower)) {
    return "material";
  }
  return "minor";
}

function detectGateFlags(allRuleText) {
  const lower = allRuleText.toLowerCase();
  return {
    mentionsKarmaMinimum: /karma/.test(lower),
    mentionsAccountAge: /account age|account must be|days old|account older/.test(lower),
    mentionsSelfPromoRestriction: /self.?promo|self promotion|advertis/.test(lower),
    mentionsModApproval: /mod(erator)? approval|message the mod|contact mod/.test(lower),
    mentionsFlairRequired: /flair is required|must (have|use|include) (a |an )?flair|require.*flair/.test(lower),
    mentionsLinkRestriction: /no links|link.?free|text.?only|self.?post only/.test(lower),
  };
}

function getVerdict(removalRatePercent, taggedRules) {
  const hasBlockingRule = taggedRules.some((r) => r.severity === "blocking");

  if (removalRatePercent >= 60 || (hasBlockingRule && removalRatePercent >= 40)) {
    return {
      verdict: "avoid",
      reasoning:
        "High removal rate (" +
        removalRatePercent +
        "%) combined with strictly enforced rules makes this subreddit risky without significant prep.",
    };
  }

  if (removalRatePercent >= 30) {
    return {
      verdict: "warm up first",
      reasoning:
        "Moderate removal rate (" +
        removalRatePercent +
        "%). Build some karma here and follow the posting rules closely before posting your key content.",
    };
  }

  return {
    verdict: "post",
    reasoning:
      "Low removal rate (" +
      removalRatePercent +
      "%) and no unusual restrictions detected. This subreddit looks approachable.",
  };
}

// Arctic Shift is a free, community-run service that can briefly slow
// down under load. If we get a "please slow down" style response, wait
// a couple seconds and try again before giving up, so a real customer's
// report doesn't fail over a transient hiccup.
async function fetchWithRetry(url, maxRetries = 2, delayMs = 2000) {
  let lastRes = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(url);
    if (res.ok) return res;
    lastRes = res;
    const retryable = res.status === 422 || res.status === 429 || res.status === 503;
    if (retryable && attempt < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      continue;
    }
    return res;
  }
  return lastRes;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subreddit = searchParams.get("subreddit");

  if (!subreddit) {
    return Response.json({ error: "Missing subreddit" }, { status: 400 });
  }

  try {
    const aboutUrl =
      "https://arctic-shift.photon-reddit.com/api/subreddits/search?subreddit_prefix=" +
      encodeURIComponent(subreddit) +
      "&limit=1";
    const aboutRes = await fetchWithRetry(aboutUrl);

    if (!aboutRes.ok) {
      const errText = await aboutRes.text();
      return Response.json(
        {
          error: "Arctic Shift subreddit-info request failed",
          status: aboutRes.status,
          details: errText.slice(0, 300),
        },
        { status: 500 }
      );
    }

    const aboutData = await aboutRes.json();
    const info = aboutData.data && aboutData.data[0] ? aboutData.data[0] : null;

    const rulesUrl =
      "https://api.redditapis.com/api/reddit/sub/" +
      encodeURIComponent(subreddit) +
      "/rules";
    const rulesRes = await fetch(rulesUrl, {
      headers: { Authorization: "Bearer " + process.env.REDDITAPIS_KEY },
    });
    let rules = [];
    let siteRules = [];
    if (rulesRes.ok) {
      const rulesData = await rulesRes.json();
      rules = rulesData.rules || [];
      siteRules = rulesData.site_rules || [];
    }

    const taggedRules = rules.map((r) => ({
      name: r.name,
      description: r.description,
      appliesTo: r.applies_to,
      severity: classifyRuleSeverity((r.name || "") + " " + (r.description || "")),
    }));

    const allRuleText = rules.map((r) => (r.name || "") + " " + (r.description || "")).join(" ");
    const gateFlags = detectGateFlags(allRuleText);

    // Arctic Shift snapshots posts the moment they're created (score=1,
    // comments=0) and only reflects real vote counts after ~36 hours.
    // We only look at posts 3-90 days old so vote counts have settled.
    // Note: Arctic Shift caps 'limit' at 100 max per request.
    const now = Math.floor(Date.now() / 1000);
    const beforeTimestamp = now - 3 * 24 * 60 * 60;
    const afterTimestamp = now - 90 * 24 * 60 * 60;

    const postsUrl =
      "https://arctic-shift.photon-reddit.com/api/posts/search?subreddit=" +
      encodeURIComponent(subreddit) +
      "&limit=100&sort=desc&before=" +
      beforeTimestamp +
      "&after=" +
      afterTimestamp;
    const postsRes = await fetchWithRetry(postsUrl);

    if (!postsRes.ok) {
      const errText = await postsRes.text();
      return Response.json(
        {
          error: "Arctic Shift posts request failed",
          status: postsRes.status,
          details: errText.slice(0, 300),
        },
        { status: 500 }
      );
    }

    const postsData = await postsRes.json();
    const posts = postsData.data || [];

    const scores = posts.map((p) => p.score || 0);
    const comments = posts.map((p) => p.num_comments || 0);
    const postCount = posts.length || 1;

    // Removal risk (fixed)
    const removedCount = posts.filter(isRemoved).length;
    const removalRatePercent = Math.round((removedCount / postCount) * 100);

    // Dead-post rate: posts with score <= 1
    const deadCount = posts.filter((p) => (p.score || 0) <= 1).length;
    const deadPostRatePercent = Math.round((deadCount / postCount) * 100);

    // Upvote ratio (Reddit's own % of upvotes vs downvotes, when available)
    const upvoteRatios = posts
      .map((p) => p.upvote_ratio)
      .filter((r) => typeof r === "number");
    const avgUpvoteRatio = upvoteRatios.length
      ? Math.round((upvoteRatios.reduce((a, b) => a + b, 0) / upvoteRatios.length) * 100) / 100
      : null;

    // Format split
    const typeCounts = { text: 0, link: 0, image: 0, video: 0 };
    for (const p of posts) {
      typeCounts[getPostType(p)] += 1;
    }

    // Average title length of top-scoring quarter of posts (the "winners")
    const sortedByScore = [...posts].sort((a, b) => (b.score || 0) - (a.score || 0));
    const topQuarter = sortedByScore.slice(0, Math.max(1, Math.ceil(posts.length / 4)));
    const avgWinningTitleLength = topQuarter.length
      ? Math.round(
          topQuarter.reduce((sum, p) => sum + (p.title || "").length, 0) / topQuarter.length
        )
      : 0;

    // Flair analysis
    const flairScores = {};
    for (const p of posts) {
      const flair = p.link_flair_text;
      if (!flair) continue;
      if (!flairScores[flair]) flairScores[flair] = [];
      flairScores[flair].push(p.score || 0);
    }
    const flairStats = Object.entries(flairScores)
      .map(([flair, scoreList]) => ({
        flair,
        count: scoreList.length,
        avgScore: Math.round(scoreList.reduce((a, b) => a + b, 0) / scoreList.length),
      }))
      .sort((a, b) => b.avgScore - a.avgScore);

    // Timing analysis - day of week + hour from top-performing posts
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const windowCounts = {};
    for (const p of topQuarter) {
      if (!p.created_utc) continue;
      const date = new Date(p.created_utc * 1000);
      const day = dayNames[date.getUTCDay()];
      const hour = date.getUTCHours();
      const key = day + " " + hour + ":00 UTC";
      windowCounts[key] = (windowCounts[key] || 0) + 1;
    }
    const bestWindows = Object.entries(windowCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([window]) => window);

    // Evidence - top 5 posts with links
    const evidence = sortedByScore.slice(0, 5).map((p) => ({
      title: p.title,
      score: p.score || 0,
      comments: p.num_comments || 0,
      url: "https://reddit.com" + (p.permalink || ""),
    }));

    // Identity: age + posting frequency, calculated from real data
    const nowSeconds = Math.floor(Date.now() / 1000);
    const ageDays = info && info.created_utc ? Math.floor((nowSeconds - info.created_utc) / 86400) : null;

    const postTimestamps = posts.map((p) => p.created_utc).filter(Boolean);
    let postsPerDay = null;
    let commentsPerDay = null;
    if (postTimestamps.length > 1) {
      const oldest = Math.min(...postTimestamps);
      const newest = Math.max(...postTimestamps);
      const spanDays = Math.max(1, (newest - oldest) / 86400);
      postsPerDay = Math.round((posts.length / spanDays) * 10) / 10;
      const totalComments = comments.reduce((a, b) => a + b, 0);
      commentsPerDay = Math.round((totalComments / spanDays) * 10) / 10;
    }

    const verdict = getVerdict(removalRatePercent, taggedRules);

    return Response.json({
      subreddit,
      identity: info
        ? {
            title: info.title || null,
            subscribers: info.subscribers || null,
            description: info.public_description || null,
            createdUtc: info.created_utc || null,
            ageDays,
            postsPerDay,
            commentsPerDay,
          }
        : null,
      traction: {
        postsAnalyzed: postCount,
        medianScore: median(scores),
        medianComments: median(comments),
        p90Score: percentile(scores, 90),
        avgUpvoteRatio,
        deadPostRatePercent,
      },
      removalRisk: {
        removalRatePercent,
      },
      format: {
        breakdown: typeCounts,
        avgWinningTitleLength,
      },
      gates: {
        rules: taggedRules,
        siteRules,
        detected: gateFlags,
      },
      flair: flairStats,
      timing: {
        bestWindows,
      },
      evidence,
      verdict,
    });
  } catch (error) {
    return Response.json(
      { error: "Subreddit lookup failed", details: error.message },
      { status: 500 }
    );
  }
}
