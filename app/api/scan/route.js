export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return Response.json({ error: "Missing keyword" }, { status: 400 });
  }

  try {
    const apiUrl =
      "https://api.redditapis.com/api/reddit/search?q=" +
      encodeURIComponent(keyword) +
      "&sort=new&limit=100";

    const res = await fetch(apiUrl, {
      headers: {
        Authorization: "Bearer " + process.env.REDDITAPIS_KEY,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      return Response.json(
        { error: "Redditapis request failed", status: res.status, details: errText.slice(0, 500) },
        { status: 500 }
      );
    }

    const data = await res.json();
    const posts = data.posts || [];

    const subredditCounts = {};
    for (const post of posts) {
      const sub = post.subreddit;
      if (!sub) continue;
      subredditCounts[sub] = (subredditCounts[sub] || 0) + 1;
    }

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
