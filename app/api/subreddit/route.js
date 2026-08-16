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
    const aboutRes = await fetch(aboutUrl);
    const aboutData = await aboutRes.json();
    const info = aboutData.data && aboutData.data[0] ? aboutData.data[0] : null;

    // Arctic Shift snapshots posts the moment they're created (score=1,
    // comments=0) and only reflects real vote counts after ~36 hours.
    // So we only look at posts at least 3 days old (settled data) and
    // no older than 90 days (recent enough to reflect current activity).
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
    const postsRes = await fetch(postsUrl);
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

    return Response.json({
      subreddit,
      identity: info
        ? {
            title: info.title || null,
            subscribers: info.subscribers || null,
            description: info.public_description || null,
            createdUtc: info.created_utc || null,
          }
        : null,
      traction: {
        postsAnalyzed: postCount,
        medianScore: median(scores),
        medianComments: median(comments),
        p90Score: percentile(scores, 90),
        deadPostRatePercent,
      },
      removalRisk: {
        removalRatePercent,
      },
      format: {
        breakdown: typeCounts,
        avgWinningTitleLength,
      },
      flair: flairStats,
      timing: {
        bestWindows,
      },
      evidence,
    });
  } catch (error) {
    return Response.json(
      { error: "Subreddit lookup failed", details: error.message },
      { status: 500 }
    );
  }
}
