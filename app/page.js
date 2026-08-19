"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavAuthStatus from "../components/NavAuthStatus.js";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  function handleScan(e) {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push("/scan/" + encodeURIComponent(keyword.trim()));
  }

  return (
    <div
      className="min-h-screen px-6 pb-16"
      style={{
        background:
          "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
      }}
    >
      <nav className="mx-auto mt-6 flex max-w-4xl items-center justify-between gap-2 rounded-full bg-[#12171D] px-3 py-1.5 shadow-[0_8px_24px_-8px_rgba(18,23,29,0.4)] sm:gap-3 sm:px-6">
        <img
          src="/lockup-horizontal-white.svg"
          alt="RedHiveLabs"
          className="w-auto flex-shrink-0"
          style={{ height: "32px" }}
        />
        <div
          className="flex items-center gap-2 text-[11px] font-medium text-white/70 sm:gap-6 sm:text-sm"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          <Link href="/services" className="hover:text-white">
            Services
          </Link>
          <Link href="/reddit-intel-report" className="hover:text-white">
            Reddit Intel Report
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <NavAuthStatus />
        </div>
      </nav>

      <div className="relative mx-auto mt-20 w-full max-w-2xl text-center">
        <h1
          className="text-4xl font-bold leading-tight tracking-tight text-[#12171D] sm:text-6xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Buyers Check
          <br />
          <span className="text-[#0B6E62]">REDDIT First</span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-lg text-[#12171D]/70">
          Discover the Reddit Communities That Matter
        </p>

        <div className="relative mx-auto mt-9 max-w-xl">
          <div className="float-icon pointer-events-none absolute -right-2 -top-6 sm:-right-6 sm:-top-8">
            <svg viewBox="0 0 216 216" className="h-8 w-8 drop-shadow-lg sm:h-11 sm:w-11">
              <circle cx="108" cy="108" r="108" fill="#FF4500" />
              <path
                fill="#FFFFFF"
                d="M169.2 108.5c0-8.3-6.7-15-15-15-4 0-7.7 1.6-10.4 4.2-10.2-6.9-24-11.4-39.3-12l6.7-31.5 21.9 4.7c.1 5.7 4.7 10.3 10.5 10.3 5.8 0 10.6-4.7 10.6-10.6s-4.7-10.6-10.6-10.6c-4.1 0-7.7 2.4-9.4 5.8l-24.5-5.2c-1.2-.3-2.4.5-2.7 1.7l-7.4 34.9c-15.5.5-29.5 5-39.8 12-2.7-2.6-6.4-4.2-10.4-4.2-8.3 0-15 6.7-15 15 0 6.1 3.6 11.3 8.9 13.7-.2 1.5-.3 3-.3 4.6 0 22.9 26.7 41.5 59.6 41.5s59.6-18.6 59.6-41.5c0-1.5-.1-3.1-.3-4.6 5.2-2.4 8.8-7.6 8.8-13.7zM80.9 121.4c0-5.8 4.7-10.6 10.6-10.6s10.6 4.7 10.6 10.6-4.7 10.6-10.6 10.6-10.6-4.7-10.6-10.6zm59.4 27.4c-7.1 7.1-20.6 7.6-24.5 7.6s-17.5-.5-24.5-7.6c-1.1-1.1-1.1-2.9 0-4 1.1-1.1 2.9-1.1 4 0 4.6 4.6 14.8 6.2 20.5 6.2s15.9-1.6 20.5-6.2c1.1-1.1 2.9-1.1 4 0 1.1 1.1 1.1 2.9 0 4zm-2.2-16.8c-5.8 0-10.6-4.7-10.6-10.6s4.7-10.6 10.6-10.6 10.6 4.7 10.6 10.6-4.7 10.6-10.6 10.6z"
              />
            </svg>
          </div>

          <form
            onSubmit={handleScan}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#12171D]/30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={keyword}
                onChange={function (e) {
                  setKeyword(e.target.value);
                }}
                placeholder="e.g. skincare for sensitive skin"
                className="w-full rounded-full border border-[#12171D]/10 bg-white py-4 pl-12 pr-5 text-[#12171D] shadow-[0_8px_24px_-8px_rgba(18,23,29,0.15)] outline-none transition-shadow focus:border-[#0B6E62] focus:shadow-[0_8px_28px_-6px_rgba(11,110,98,0.25)]"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-[#0B6E62] px-8 py-4 font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53] hover:shadow-[0_10px_24px_-6px_rgba(11,110,98,0.6)]"
            >
              Find My Audience
            </button>
          </form>
        </div>

        <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[#0B6E62]/20 bg-[#0B6E62]/5 px-4 py-1.5 text-xs font-medium text-[#0B6E62]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0B6E62]" />
          Powered By Real Reddit Data
        </div>

        <div className="mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#12171D]/40">
          <a
            href="https://twitter.com/Redhivelabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#0B6E62]"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @Redhivelabs
          </a>
          <Link href="/privacy" className="hover:text-[#0B6E62]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#0B6E62]">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
