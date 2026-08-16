// Sandbox for now - switch to https://api-m.paypal.com when going live
const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

export async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  const credentials = Buffer.from(clientId + ":" + clientSecret).toString("base64");

  const res = await fetch(PAYPAL_BASE_URL + "/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + credentials,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Failed to get PayPal access token: " + errText.slice(0, 300));
  }

  const data = await res.json();
  return data.access_token;
}

export { PAYPAL_BASE_URL };
