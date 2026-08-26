import { SignJWT } from "jose";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return Response.json({ error: "Valid email required" }, { status: 400 });
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

    const token = await new SignJWT({ email })
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
        to: email,
        subject: "Your Wolf of Reddit login link",
        html:
          "<p>Click below to log in. This link expires in 15 minutes.</p>" +
          '<p><a href="' + magicLink + '">Log in to Wolf of Reddit</a></p>' +
          "<p>If you did not request this, you can ignore this email.</p>",
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      return Response.json(
        { error: "Failed to send email", details: errText.slice(0, 300) },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Send failed", details: error.message },
      { status: 500 }
    );
  }
}
