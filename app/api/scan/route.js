export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return Response.json({ error: "Missing keyword" }, { status: 400 });
  }

  try {
    // Step 1: Search PullPush for posts matching the keyword across all subreddits
    const pullpushUrl = `https://api.pullpush.io/reddit/search/submission/?q=${encodeURIComponent(
      keyword
    )}&size=100&sort=desc`;

    const pullpushRes = await fetch(pullpushUrl);
    const pullpushData = await pullpushRes.json();
    const posts = pullpushData.data || [];

    // Step 2: Count how many matching posts came from each subreddit
    const subredditCounts = {};
    for (const post of posts) {
      const sub = post.subreddit;
      if (!sub) continue;
      subredditCounts[sub] = (subredditCounts[sub] || 0) + 1;
    }

    // Step 3: Sort subreddits by how often they appeared, take top 5
    const topSubreddits = Object.entries(subredditCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([subreddit, count]) => ({ subreddit, mentions: count }));

    return Response.json({ keyword, results: topSubreddits });
  } catch (error) {
    return Response.json(
      { error: "Scan failed", details: error.message },
      { status: 500 }
    );
  }
}