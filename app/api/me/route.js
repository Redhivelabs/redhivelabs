import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return Response.json({ loggedIn: false });
  }

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(sessionToken, secret);
    return Response.json({
      loggedIn: true,
      email: payload.email,
      picture: payload.picture || null,
    });
  } catch (error) {
    return Response.json({ loggedIn: false });
  }
}
