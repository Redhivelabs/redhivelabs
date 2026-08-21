import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Logout failed", details: error.message },
      { status: 500 }
    );
  }
}
