"use client";

import { useState } from "react";
import PayPalButton from "./PayPalButton.js";

export default function ReportCheckoutCard() {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="mx-auto mt-8 max-w-sm text-left">
      <label className="text-xs font-medium uppercase tracking-wide text-white/70">
        Keyword
      </label>
      <input
        type="text"
        value={keyword}
        onChange={function (e) {
          setKeyword(e.target.value);
        }}
        placeholder="e.g. skincare for sensitive skin"
        className="mt-2 w-full rounded-full border border-white/10 bg-[#0D0E10] px-5 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#FF6A1A]"
      />

      {!keyword.trim() && (
        <p className="mt-4 text-center text-xs font-medium text-[#FF6A1A]">
          Enter a keyword above to unlock checkout.
        </p>
      )}

      {keyword.trim() && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-[#191B1F] p-4 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]">
          <PayPalButton orderType="report" keyword={keyword.trim()} quantity={1} />
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            Secure checkout via PayPal
          </div>
        </div>
      )}

      <p className="mt-4 text-center text-xs text-white/50">
        No account needed — we&apos;ll email your login link right after.
      </p>
    </div>
  );
}
