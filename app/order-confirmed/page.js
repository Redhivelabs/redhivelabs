"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ORDER_TYPE_LABELS = {
  report: "Subreddit Placement Report",
  posts: "Sub Reddit Posts",
  comments: "Sub Reddit Comments",
};

function OrderConfirmedContent() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const orderType = searchParams.get("orderType");
  const keyword = searchParams.get("keyword");
  const quantity = searchParams.get("quantity");
  const amount = searchParams.get("amount");
  const isGuest = searchParams.get("guest") === "true";
  const email = searchParams.get("email");

  const label = ORDER_TYPE_LABELS[orderType] || orderType;

  return (
    <div style={{ maxWidth: 560, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Thanks — your order is in!</h1>

      {isGuest ? (
        <p style={{ color: "#555", marginBottom: 32 }}>
          We&apos;ve sent your order confirmation and a login link to{" "}
          <strong>{email}</strong>. Click the link anytime to check on your
          report — every order is reviewed and prepared by hand, so it
          isn&apos;t instant.
        </p>
      ) : (
        <p style={{ color: "#555", marginBottom: 32 }}>
          We&apos;ve sent a confirmation to your email. Every order is reviewed
          and prepared by hand, so it isn&apos;t instant — we&apos;ll email you
          again as soon as it&apos;s ready.
        </p>
      )}

      {orderId && (
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: 12,
            padding: 24,
            textAlign: "left",
            marginBottom: 32,
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <strong>Order:</strong> #{orderId}
          </div>
          {label && (
            <div style={{ marginBottom: 8 }}>
              <strong>Service:</strong> {label}
            </div>
          )}
          {keyword && (
            <div style={{ marginBottom: 8 }}>
              <strong>Keyword:</strong> {keyword}
            </div>
          )}
          {quantity && Number(quantity) > 1 && (
            <div style={{ marginBottom: 8 }}>
              <strong>Quantity:</strong> {quantity}
            </div>
          )}
          {amount && (
            <div>
              <strong>Amount paid:</strong> ${amount}
            </div>
          )}
        </div>
      )}

      <Link
        href="/dashboard"
        style={{
          display: "inline-block",
          padding: "12px 28px",
          borderRadius: 999,
          background: "#0B6E62",
          color: "white",
          textDecoration: "none",
        }}
      >
        Go to your dashboard
      </Link>

      {isGuest && (
        <p style={{ marginTop: 16, fontSize: 13, color: "#888" }}>
          Don&apos;t have an account yet? Use the login link we emailed you —
          clicking &quot;dashboard&quot; now will just ask you to sign in.
        </p>
      )}
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmedContent />
    </Suspense>
  );
}
