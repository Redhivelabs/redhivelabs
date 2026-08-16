"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

export default function PayPalButton({ keyword }) {
  const router = useRouter();

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "horizontal", color: "black", shape: "pill", label: "pay" }}
        createOrder={async () => {
          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ keyword }),
          });
          const data = await res.json();

          if (data.error) {
            if (res.status === 401) {
              router.push("/login");
              throw new Error("Not logged in");
            }
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
            router.push("/dashboard");
          } else {
            alert("Payment could not be completed. Please try again.");
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
        }}
      />
    </PayPalScriptProvider>
  );
}
