import { SignJWT } from "jose";
import { db } from "../../../../../db/client.js";
import { users } from "../../../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("state") || "/dashboard";

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://redhivelabs.com"
      : "http://localhost:3000";

  function redirectTo(path, cookieValue) {
    const headers = new Headers();
    headers.set("Location", baseUrl + path);
    if (cookieValue) {
      headers.set(
        "Set-Cookie",
        "session=" +
          cookieValue +
          "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=" +
          60 * 60 * 24 * 7
      );
    }
    return new Response(null, { status: 302, headers });
  }

  if (!code) {
    return redirectTo("/login?error=google_missing_code");
  }

  try {
    const redirectUri = baseUrl + "/api/auth/google/callback";

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }).toString(),
    });

    if (!tokenRes.ok) {
      return redirectTo("/login?error=google_token_failed");
    }

    const tokenData = await tokenRes.json();

    const userInfoRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: "Bearer " + tokenData.access_token } }
    );

    if (!userInfoRes.ok) {
      return redirectTo("/login?error=google_userinfo_failed");
    }

    const googleUser = await userInfoRes.json();
    const email = googleUser.email;

    if (!email) {
      return redirectTo("/login?error=google_no_email");
    }

    let existing = await db.select().from(users).where(eq(users.email, email));
    let user = existing[0];

    if (!user) {
      const inserted = await db.insert(users).values({ email }).returning();
      user = inserted[0];
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const sessionToken = await new SignJWT({
      userId: user.id,
      email: user.email,
      picture: googleUser.picture || null,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    return redirectTo(next, sessionToken);
  } catch (error) {
    return redirectTo(
      "/login?error=google_failed&reason=" + encodeURIComponent(error.message)
    );
  }
}
