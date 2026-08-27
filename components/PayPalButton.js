"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

export default function PayPalButton({ orderType, keyword, quantity, notes, findSubreddit, standalone = true }) {
  const router = useRouter();

  const buttons = (
    <PayPalButtons
      style={{ layout: "horizontal", color: "black", shape: "pill", label: "pay", tagline: false }}
      createOrder={async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderType: orderType || "report",
            keyword: keyword,
            quantity: quantity || 1,
            notes: notes || "",
            findSubreddit: Boolean(findSubreddit),
          }),
        });
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        return data.paypalOrderId;
      }}
      onApprove={async (data) => {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paypalOrderId: data.orderID }),
        });
        const result = await res.json();

        if (result.success) {
          const params = new URLSearchParams({
            orderId: result.orderId,
            orderType: result.orderType || "",
            keyword: result.keyword || "",
            quantity: result.quantity || "",
            amount: result.amount || "",
          });
          if (result.guestCheckout) {
            params.set("guest", "true");
            params.set("email", result.email || "");
          }
          router.push("/order-confirmed?" + params.toString());
        } else {
          alert("Payment could not be completed. Please try again.");
        }
      }}
      onError={(err) => {
        console.error("PayPal error:", err);
      }}
    />
  );

  // Most pages only ever mount one PayPalButton at a time, so wrapping it in
  // its own PayPalScriptProvider here is the simplest thing that works. Pages
  // that render several of these at once (e.g. the Services packages grid)
  // need a single shared provider instead — see ServicePackagesGrid.js — so
  // they pass standalone={false} and provide their own ancestor Provider.
  if (!standalone) {
    return buttons;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      {buttons}
    </PayPalScriptProvider>
  );
}
