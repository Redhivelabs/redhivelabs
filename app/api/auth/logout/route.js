export async function POST() {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    "session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
  );
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers,
  });
}