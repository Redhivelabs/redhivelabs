import { jwtVerify } from "jose";
import { db } from "../../../../db/client.js";
import { users } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://wolfofreddit.com"
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

  if (!token) {
    return redirectTo("/login?error=missing_token");
  }

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email;

    if (!email) {
      return redirectTo("/login?error=invalid_token");
    }

    let existing = await db.select().from(users).where(eq(users.email, email));
    let user = existing[0];

    if (!user) {
      const inserted = await db.insert(users).values({ email }).returning();
      user = inserted[0];
    }

    const sessionToken = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    return redirectTo("/dashboard", sessionToken);
  } catch (error) {
    return redirectTo(
      "/login?error=verification_failed&reason=" + encodeURIComponent(error.message)
    );
  }
}
