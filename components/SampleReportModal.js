"use client";

import { useEffect, useState, useRef } from "react";
import SampleReportLink from "./SampleReportLink.js";

const STORAGE_KEY = "wor_sample_report_modal_shown";

// Shows once per session (sessionStorage, not localStorage — clears when the
// tab/browser closes) when the visitor either moves the mouse up toward the
// browser chrome (exit intent) or scrolls most of the way down the page.
// No modal library — this is the same hand-rolled overlay pattern already
// used for the mobile nav panel in SiteNav.js, so no new dependency.
export default function SampleReportModal() {
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);

  useEffect(function () {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {
      alreadyShown = false;
    }
    if (alreadyShown) {
      shownRef.current = true;
      return;
    }

    function trigger() {
      if (shownRef.current) return;
      shownRef.current = true;
      setVisible(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch (e) {}
    }

    function handleMouseOut(e) {
      if (e.clientY <= 0 && !e.relatedTarget) {
        trigger();
      }
    }

    function handleScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight > 0 && scrolled / docHeight >= 0.8) {
        trigger();
      }
    }

    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return function () {
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function dismiss() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#15171A] p-6 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.6)]"
        onClick={function (e) {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-white/50 hover:text-white"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <img src="/brand/wolf-badge-icon.png" alt="" className="mx-auto h-12 w-12" />

        <h3
          className="mt-4 text-center text-lg font-bold text-white"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Not sure yet?
        </h3>
        <p className="mt-2 text-center text-sm text-white/60">
          See exactly what a Reddit Intel Report looks like before you commit to anything.
        </p>

        <SampleReportLink
          className="mt-5 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors"
          style={{ backgroundColor: "var(--color-accent)" }}
          onMouseEnter={function (e) {
            e.currentTarget.style.backgroundColor = "var(--color-accent-hover)";
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.backgroundColor = "var(--color-accent)";
          }}
        >
          Download Sample Report
        </SampleReportLink>
      </div>
    </div>
  );
}
