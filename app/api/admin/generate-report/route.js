import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { db } from "../../../../db/client.js";
import { orders } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";
import { buildReport } from "../_lib/reportPipeline.js";

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
    const orderId = parseInt(body.orderId, 10);
    const client = (body.client || "").trim();
    const competitors = (body.competitors || "")
      .split(",")
      .map(function (c) { return c.trim(); })
      .filter(Boolean);

    if (!orderId) {
      return Response.json({ error: "Missing orderId" }, { status: 400 });
    }

    const orderRows = await db.select().from(orders).where(eq(orders.id, orderId));
    const order = orderRows[0];
    if (!order) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    const keyword = order.keyword;
    const baseUrl = new URL(request.url).origin;

    const report = await buildReport({ keyword: keyword, competitors: competitors, baseUrl: baseUrl });

    return Response.json({ orderId: orderId, client: client, ...report });
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
