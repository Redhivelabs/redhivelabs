import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { buildReport } from "../_lib/reportPipeline.js";

// Keyword-only variant of /api/admin/generate-report for the /admin/demo
// tool. Deliberately does not touch the orders or users tables at all —
// this is a standalone testing tool, not tied to a real order.
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
      return Response.json({ error: "Not logged in" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(sessionToken, secret);

    if (payload.email !== process.env.ADMIN_EMAIL) {
      return Response.json({ error: "Not authorized" }, { status: 403 });
    }

    const body = await request.json();
    const keyword = (body.keyword || "").trim();
    const competitors = (body.competitors || "")
      .split(",")
      .map(function (c) { return c.trim(); })
      .filter(Boolean);

    if (!keyword) {
      return Response.json({ error: "Missing keyword" }, { status: 400 });
    }

    const baseUrl = new URL(request.url).origin;

    const report = await buildReport({ keyword: keyword, competitors: competitors, baseUrl: baseUrl });

    return Response.json(report);
  } catch (error) {
    if (error.status) {
      return Response.json(
        { error: error.message, status: error.status, details: error.details },
        { status: 500 }
      );
    }
    return Response.json(
      { error: "Report generation failed", details: error.message },
      { status: 500 }
    );
  }
}
