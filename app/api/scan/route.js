import { jwtVerify } from "jose";
import { db } from "../../../db/client.js";
import { scans } from "../../../db/schema.js";
import { eq, and, gte } from "drizzle-orm";

const MIN_MENTIONS = 3;
const DAILY_LIMIT = 2;

async function getUserIdFromSession(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/session=([^;]+)/);
  if (!match) return null;

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(match[1], secret);
    return payload.userId || null;
  } catch (e) {
    return null;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return Response.json({ error: "Missing keyword" }, { status: 400 });
  }

  try {
    const userId = await getUserIdFromSession(request);

    if (userId) {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recentScans = await db
        .select()
        .from(scans)
        .where(and(eq(scans.userId, userId), gte(scans.createdAt, oneDayAgo)));

      if (recentScans.length >= DAILY_LIMIT) {
        return Response.json(
          { error: "You've reached today's scan limit. Try again tomorrow." },
          { status: 429 }
        );
      }
    }

    const apiUrl =
      "https://api.redditapis.com/api/reddit/search?q=" +
      encodeURIComponent(keyword) +
      "&sort=new&limit=100";

    let res = null;
    let lastErrText = "";
    const maxRetries = 6;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      res = await fetch(apiUrl, {
        headers: {
          Authorization: "Bearer " + process.env.REDDITAPIS_KEY,
        },
      });

      if (res.ok) break;

      lastErrText = await res.text();
      const isPoolSaturated = res.status === 503 && lastErrText.includes("pool_saturated");

      if (isPoolSaturated && attempt < maxRetries) {
        const waitTime = Math.min(5000 * (attempt + 1), 15000);
        await new Promise(function (resolve) {
          setTimeout(resolve, waitTime);
        });
        continue;
      }
      break;
    }

    if (!res.ok) {
      return Response.json(
        { error: "Redditapis request failed", status: res.status, details: lastErrText.slice(0, 500) },
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

    const rankedSubreddits = Object.entries(subredditCounts)
      .filter(function ([, count]) {
        return count >= MIN_MENTIONS;
      })
      .sort(function (a, b) {
        return b[1] - a[1];
      })
      .map(function ([subreddit, count]) {
        return { subreddit, mentions: count };
      });

    const topSubreddits = rankedSubreddits.slice(0, 2);
    const extendedSubreddits = rankedSubreddits.slice(0, 20);

    if (userId) {
      await db.insert(scans).values({
        keyword: keyword,
        resultData: { results: topSubreddits, extended: extendedSubreddits },
        userId: userId,
      });
    }

    return Response.json({
      keyword,
      results: topSubreddits,
      extended: extendedSubreddits,
    });
  } catch (error) {
    console.error("Scan route error:", error);
    return Response.json(
      { error: "Scan failed", details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
