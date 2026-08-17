export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const next = searchParams.get("next") || "/dashboard";

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://redhivelabs.com"
      : "http://localhost:3000";

  const redirectUri = baseUrl + "/api/auth/google/callback";

  const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      state: next,
      prompt: "select_account",
    }).toString();

  return Response.redirect(googleAuthUrl);
}