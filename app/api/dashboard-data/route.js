import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { db } from "../../../db/client.js";
import { orders, reports, scans } from "../../../db/schema.js";
import { eq, desc, and, inArray } from "drizzle-orm";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  let email = null;
  let userId = null;
  let picture = null;

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(sessionToken, secret);
    email = payload.email;
    userId = payload.userId;
    picture = payload.picture || null;
  } catch (error) {
    return Response.json({ error: "Invalid session" }, { status: 401 });
  }

  const userOrders = await db
    .select({
      orderId: orders.id,
      keyword: orders.keyword,
      status: orders.status,
      amount: orders.amount,
      orderType: orders.orderType,
      quantity: orders.quantity,
      createdAt: orders.createdAt,
      pdfUrl: reports.pdfUrl,
    })
    .from(orders)
    .leftJoin(reports, eq(reports.orderId, orders.id))
    .where(
      and(eq(orders.userId, userId), inArray(orders.status, ["paid", "fulfilled"]))
    )
    .orderBy(desc(orders.createdAt));

  const userScans = await db
    .select({
      id: scans.id,
      keyword: scans.keyword,
      createdAt: scans.createdAt,
    })
    .from(scans)
    .where(eq(scans.userId, userId))
    .orderBy(desc(scans.createdAt))
    .limit(20);

  return Response.json({
    email,
    picture,
    orders: userOrders,
    scans: userScans,
  });
}
