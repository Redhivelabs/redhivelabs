"use client";

import PayPalButton from "./PayPalButton.js";

export default function ServicePackageCard({
  featured,
  name,
  price,
  priceSuffix,
  strikePrice,
  description,
  bullets,
  note,
  ctaLabel,
  orderType,
  orderKeyword,
  standalone = true,
}) {
  return (
    <div
      className={
        "relative flex h-full flex-col rounded-2xl p-7 " +
        (featured
          ? "border border-[#FF6A1A]/30 bg-[#15171A] shadow-[0_16px_40px_-12px_rgba(255,106,26,0.3)]"
          : "border border-white/8 bg-[#15171A] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]")
      }
    >
      {featured && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FF6A1A] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(255,106,26,0.5)]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Most Popular
        </span>
      )}

      <h3
        className="text-lg font-extrabold text-white"
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        {name}
      </h3>

      <div className="mt-3 flex items-baseline gap-2">
        {strikePrice && (
          <span className="text-lg text-white/35 line-through">{strikePrice}</span>
        )}
        <span
          className="text-4xl font-extrabold"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-archivo), sans-serif" }}
        >
          {price}
        </span>
        {priceSuffix && (
          <span className="text-sm font-medium text-white/50">{priceSuffix}</span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-white/70">{description}</p>

      <ul className="mt-5 flex flex-col gap-2.5">
        {bullets.map(function (b) {
          return (
            <li key={b} className="flex items-start gap-2 text-sm text-white/70">
              <span className="mt-0.5 flex-shrink-0 text-[#FF6A1A]">✓</span>
              <span>{b}</span>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-xs italic text-white/40">{note}</p>

      <div className="mt-auto pt-6">
        <p
          className="text-center text-sm font-bold uppercase tracking-wide text-white"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          {ctaLabel}
        </p>
        <div className="mt-3 rounded-xl bg-[#191B1F] p-3">
          <PayPalButton
            orderType={orderType}
            keyword={orderKeyword}
            quantity={1}
            standalone={standalone}
          />
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          Secure checkout via PayPal
        </div>
      </div>
    </div>
  );
}
