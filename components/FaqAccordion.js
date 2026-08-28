"use client";

import { useState } from "react";

function PlusIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="flex-shrink-0 transition-transform duration-200"
      style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function FaqItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));

  return (
    <div className="rounded-2xl border border-white/8 bg-[#15171A] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]">
      <button
        type="button"
        onClick={function () {
          setOpen(function (v) {
            return !v;
          });
        }}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span
          className="text-sm font-bold text-white sm:text-base"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          {q}
        </span>
        <PlusIcon open={open} />
      </button>
      {open && (
        <div className="fade-in-detail px-5 pb-5 text-sm leading-relaxed text-white/65 sm:text-[15px]">
          {a}
        </div>
      )}
    </div>
  );
}

// Reusable expand/collapse FAQ list. `items` is [{ q, a }], where `a` can be
// a plain string or custom JSX for answers that need inline formatting.
export default function FaqAccordion({ items, defaultOpenIndex }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map(function (item, i) {
        return (
          <FaqItem
            key={item.q}
            q={item.q}
            a={item.a}
            defaultOpen={i === defaultOpenIndex}
          />
        );
      })}
    </div>
  );
}
