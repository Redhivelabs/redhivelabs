export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subreddit = searchParams.get("subreddit");

  if (!subreddit) {
    return Response.json({ error: "Missing subreddit" }, { status: 400 });
  }

  try {
    // Step 1: Get subreddit identity info (name, description, subscriber count, age)
    const aboutUrl =
      "https://arctic-shift.photon-reddit.com/api/subreddits/search?subreddit_prefix=" +
      encodeURIComponent(subreddit) +
      "&limit=1";

    const aboutRes = await fetch(aboutUrl);
    const aboutData = await aboutRes.json();
    const info = aboutData.data && aboutData.data[0] ? aboutData.data[0] : null;

    // Step 2: Get recent posts from this subreddit to measure traction
    const postsUrl =
      "https://arctic-shift.photon-reddit.com/api/posts/search?subreddit=" +
      encodeURIComponent(subreddit) +
      "&limit=50&sort=desc";

    const postsRes = await fetch(postsUrl);
    const postsData = await postsRes.json();
    const posts = postsData.data || [];

    // Step 3: Calculate basic traction numbers from those posts
    let totalScore = 0;
    let totalComments = 0;
    let removedCount = 0;

    for (const post of posts) {
      totalScore += post.score || 0;
      totalComments += post.num_comments || 0;
      if (post.removed_by_category) removedCount += 1;
    }

    const postCount = posts.length || 1;
    const medianScore = Math.round(totalScore / postCount);
    const medianComments = Math.round(totalComments / postCount);
    const removalRate =
      postCount > 0 ? Math.round((removedCount / postCount) * 100) : 0;

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
        avgScore: medianScore,
        avgComments: medianComments,
        removalRatePercent: removalRate,
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Subreddit lookup failed", details: error.message },
      { status: 500 }
    );
  }
}
