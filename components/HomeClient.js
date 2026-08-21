"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteNav from "./SiteNav.js";

export default function HomeClient() {
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
      <SiteNav />

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
          One search. Every subreddit that matters, ranked.
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
              Find My Buyers
            </button>
          </form>
        </div>

        <div className="mx-auto mt-6 max-w-xs">
          <p className="text-center text-xs text-[#12171D]/40">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-[#0B6E62] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#0B6E62] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <a
            href={"/api/auth/google?next=" + encodeURIComponent("/dashboard")}
            className="mt-4 flex items-center justify-center gap-3 rounded-full border border-[#12171D]/15 bg-white px-6 py-3 font-medium text-[#12171D] shadow-sm transition-colors hover:bg-[#12171D]/5"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
            </svg>
            Continue with Google
          </a>
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
