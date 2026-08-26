import { db } from "../../../../db/client.js";
import { orders, jobs, users } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";
import { getPayPalAccessToken, PAYPAL_BASE_URL } from "../../../../lib/paypal.js";
import { SignJWT } from "jose";

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
      from: "Wolf of Reddit <orders@wolfofreddit.com>",
      to: toEmail,
      subject: "Order confirmed — " + label + " (#" + order.id + ")",
      html: html,
    }),
  });

  if (!emailRes.ok) {
    const errText = await emailRes.text();
    console.error("Order confirmation email failed:", errText.slice(0, 300));
  }
}

// Sends a magic login link to a guest who just paid without an account yet —
// same mechanism as the existing email login flow (app/api/auth/send), just
// triggered automatically after a successful guest checkout instead of by
// the person typing their email into a login form.
async function sendGuestLoginLink({ toEmail }) {
  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const token = await new SignJWT({ email: toEmail })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(secret);

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://wolfofreddit.com"
        : "http://localhost:3000";

    const magicLink = baseUrl + "/api/auth/verify?token=" + encodeURIComponent(token);

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Wolf of Reddit <login@wolfofreddit.com>",
        to: toEmail,
        subject: "Your login link — Wolf of Reddit",
        html:
          "<p>Thanks for your order! Click below to log in and track your report.</p>" +
          '<p><a href="' + magicLink + '">Log in to Wolf of Reddit</a></p>' +
          "<p>This link expires in 15 minutes. If it expires, just come back to " +
          "wolfofreddit.com and sign in with this same email address.</p>",
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Guest login link email failed:", errText.slice(0, 300));
    }
  } catch (e) {
    console.error("Guest login link email threw:", e.message);
  }
}

// Finds an existing user by email, or creates a new one. Used to attach a
// real account to a guest order once we know their email from PayPal.
async function findOrCreateUserByEmail(email) {
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing[0]) return existing[0];

  const inserted = await db.insert(users).values({ email }).returning();
  return inserted[0];
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

    let customerEmail = null;
    let isGuestCheckout = false;

    if (order.userId) {
      // Normal logged-in checkout — look up their email as before.
      const userRows = await db.select().from(users).where(eq(users.id, order.userId));
      customerEmail = userRows[0] ? userRows[0].email : null;
    } else {
      // Guest checkout — this order had no account attached at payment
      // time. PayPal's capture response includes the payer's email, so we
      // use that to find or create their account and link it to the order.
      isGuestCheckout = true;
      const payerEmail = captureData.payer && captureData.payer.email_address
        ? captureData.payer.email_address
        : null;

      if (payerEmail) {
        const user = await findOrCreateUserByEmail(payerEmail);
        customerEmail = user.email;
        await db.update(orders).set({ userId: user.id }).where(eq(orders.id, order.id));
      }
    }

    // Send confirmation + (for guests) a login link. Never let an email
    // failure block the response — payment already succeeded.
    if (customerEmail) {
      try {
        await sendOrderConfirmationEmail({ toEmail: customerEmail, order });
      } catch (emailError) {
        console.error("Order confirmation email threw:", emailError.message);
      }

      if (isGuestCheckout) {
        await sendGuestLoginLink({ toEmail: customerEmail });
      }
    }

    return Response.json({
      success: true,
      orderId: order.id,
      orderType: order.orderType,
      keyword: order.keyword,
      quantity: order.quantity,
      amount: order.amount,
      guestCheckout: isGuestCheckout,
      email: isGuestCheckout ? customerEmail : null,
    });
  } catch (error) {
    return Response.json(
      { error: "Capture order failed", details: error.message },
      { status: 500 }
    );
  }
}
