import { db } from "../../../../db/client.js";
import { orders, jobs } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";
import { getPayPalAccessToken, PAYPAL_BASE_URL } from "../../../../lib/paypal.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const paypalOrderId = body.paypalOrderId;

    if (!paypalOrderId) {
      return Response.json({ error: "Missing paypalOrderId" }, { status: 400 });
    }

    const accessToken = await getPayPalAccessToken();

    const captureRes = await fetch(
      PAYPAL_BASE_URL + "/v2/checkout/orders/" + paypalOrderId + "/capture",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (!captureRes.ok) {
      const errText = await captureRes.text();
      return Response.json(
        { error: "PayPal capture failed", details: errText.slice(0, 300) },
        { status: 500 }
      );
    }

    const captureData = await captureRes.json();

    if (captureData.status !== "COMPLETED") {
      return Response.json(
        { error: "Payment not completed", status: captureData.status },
        { status: 400 }
      );
    }

    // Find our own order row by the PayPal order ID
    const existing = await db
      .select()
      .from(orders)
      .where(eq(orders.paypalOrderId, paypalOrderId));
    const order = existing[0];

    if (!order) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    // Mark it as paid
    await db.update(orders).set({ status: "paid" }).where(eq(orders.id, order.id));

    // Queue a job so it shows up in the admin panel for manual fulfilment
    await db.insert(jobs).values({
      orderId: order.id,
      status: "queued",
      progress: 0,
    });

    return Response.json({ success: true, orderId: order.id });
  } catch (error) {
    return Response.json(
      { error: "Capture order failed", details: error.message },
      { status: 500 }
    );
  }
}
