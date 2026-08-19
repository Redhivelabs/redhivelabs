import { db } from "../../../../db/client.js";
import { orders, jobs, users } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";
import { getPayPalAccessToken, PAYPAL_BASE_URL } from "../../../../lib/paypal.js";

const ORDER_TYPE_LABELS = {
  report: "Subreddit Placement Report",
  posts: "Sub Reddit Posts",
  comments: "Sub Reddit Comments",
};

async function sendOrderConfirmationEmail({ toEmail, order }) {
  const label = ORDER_TYPE_LABELS[order.orderType] || order.orderType;

  const html =
    "<p>Thanks for your order — here's a quick summary:</p>" +
    "<ul>" +
    "<li><strong>Order:</strong> #" + order.id + "</li>" +
    "<li><strong>Service:</strong> " + label + "</li>" +
    "<li><strong>Keyword:</strong> " + order.keyword + "</li>" +
    (order.quantity > 1 ? "<li><strong>Quantity:</strong> " + order.quantity + "</li>" : "") +
    "<li><strong>Amount paid:</strong> $" + order.amount + "</li>" +
    "</ul>" +
    "<p>Our team reviews and prepares every order by hand, so it isn't instant — " +
    "we'll email you at this address as soon as it's ready.</p>" +
    "<p>Questions in the meantime? Just reply to this email.</p>";

  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.RESEND_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "RedHiveLabs <orders@redhivelabs.com>",
      to: toEmail,
      subject: "Order confirmed — " + label + " (#" + order.id + ")",
      html: html,
    }),
  });

  if (!emailRes.ok) {
    const errText = await emailRes.text();
    // Don't fail the whole request just because the email didn't send —
    // the payment already succeeded and the order already exists.
    // Just log it so it's visible in the server logs.
    console.error("Order confirmation email failed:", errText.slice(0, 300));
  }
}

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

    // Look up the customer's email (from their Google/magic-link account)
    // and send them an order confirmation. This never blocks or fails
    // the response — payment already succeeded, so a flaky email send
    // shouldn't turn into an error page for the customer.
    const userRows = await db.select().from(users).where(eq(users.id, order.userId));
    const customerEmail = userRows[0] ? userRows[0].email : null;

    if (customerEmail) {
      try {
        await sendOrderConfirmationEmail({ toEmail: customerEmail, order });
      } catch (emailError) {
        console.error("Order confirmation email threw:", emailError.message);
      }
    }

    return Response.json({
      success: true,
      orderId: order.id,
      orderType: order.orderType,
      keyword: order.keyword,
      quantity: order.quantity,
      amount: order.amount,
    });
  } catch (error) {
    return Response.json(
      { error: "Capture order failed", details: error.message },
      { status: 500 }
    );
  }
}
