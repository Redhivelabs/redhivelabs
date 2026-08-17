import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { db } from "../../../../db/client.js";
import { orders } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";
import { getPayPalAccessToken, PAYPAL_BASE_URL } from "../../../../lib/paypal.js";

const PRICES = {
  report: 69,
  posts: 30,
  comments: 15,
};

const FIND_SUBREDDIT_FEE = 5;

const LABELS = {
  report: "Subreddit placement report",
  posts: "Subreddit posting service",
  comments: "Subreddit commenting service",
};

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
      return Response.json(
        { error: "You must be logged in to place an order" },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(sessionToken, secret);
    const userId = payload.userId;

    if (!userId) {
      return Response.json({ error: "Invalid session" }, { status: 401 });
    }

    const body = await request.json();
    const keyword = (body.keyword || "").trim();
    const notes = (body.notes || "").slice(0, 1000);
    const orderType = ["report", "posts", "comments"].includes(body.orderType)
      ? body.orderType
      : "report";
    const findSubreddit = orderType !== "report" && Boolean(body.findSubreddit);

    let quantity = parseInt(body.quantity, 10);
    if (!Number.isFinite(quantity) || quantity < 1) {
      quantity = 1;
    }
    if (orderType === "report") {
      quantity = 1;
    }
    if (quantity > 15) {
      quantity = 15;
    }

    if (!keyword) {
      return Response.json({ error: "Missing keyword" }, { status: 400 });
    }

    const unitPrice = PRICES[orderType] + (findSubreddit ? FIND_SUBREDDIT_FEE : 0);
    const totalAmount = unitPrice * quantity;

    // Create a pending order in our own database first
    const inserted = await db
      .insert(orders)
      .values({
        userId,
        keyword,
        status: "pending",
        amount: totalAmount,
        orderType,
        quantity,
        notes: notes || null,
      })
      .returning();
    const order = inserted[0];

    // Ask PayPal to create the real payment order
    const accessToken = await getPayPalAccessToken();

    const description =
      LABELS[orderType] +
      ": " +
      keyword +
      (orderType !== "report" ? " (x" + quantity + ")" : "") +
      (findSubreddit ? " + find subreddit" : "");

    const paypalRes = await fetch(PAYPAL_BASE_URL + "/v2/checkout/orders", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: String(order.id),
            description: description.slice(0, 127),
            amount: {
              currency_code: "USD",
              value: totalAmount.toFixed(2),
            },
          },
        ],
      }),
    });

    if (!paypalRes.ok) {
      const errText = await paypalRes.text();
      return Response.json(
        { error: "PayPal order creation failed", details: errText.slice(0, 300) },
        { status: 500 }
      );
    }

    const paypalData = await paypalRes.json();

    // Save PayPal's order ID onto our own order row so we can match them up later
    await db
      .update(orders)
      .set({ paypalOrderId: paypalData.id })
      .where(eq(orders.id, order.id));

    return Response.json({ paypalOrderId: paypalData.id, orderId: order.id });
  } catch (error) {
    return Response.json(
      { error: "Create order failed", details: error.message },
      { status: 500 }
    );
  }
}
