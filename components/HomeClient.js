"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteNav from "./SiteNav.js";

export default function HomeClient() {
  const [keyword, setKeyword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(function () {
    async function checkLogin() {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        setIsLoggedIn(Boolean(data.loggedIn));
      } catch (e) {
        setIsLoggedIn(false);
      }
    }
    checkLogin();
  }, []);

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
          "radial-gradient(ellipse at top, #15171A 0%, #0D0E10 55%, #08090B 100%)",
      }}
    >
      <SiteNav />

      <div className="relative mx-auto mt-6 w-full max-w-2xl text-center sm:mt-10">
        <img
          src="/brand/wolf-badge-icon.png"
          alt="Wolf of Reddit"
          className="mx-auto h-16 w-16 drop-shadow-[0_8px_24px_rgba(255,106,26,0.25)] sm:h-24 sm:w-24"
        />

        <h1
          className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:mt-6 sm:text-6xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Buyers Check
          <br />
          <span style={{ color: "var(--color-accent)" }}>REDDIT First</span>
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-base text-white/60 sm:mt-5 sm:text-lg">
          Enter your niche. Get every subreddit where your buyers are already
          talking — scored, ranked, and ready to work.
        </p>

        <div className="relative mx-auto mt-6 max-w-xl sm:mt-9">
          <form onSubmit={handleScan} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30"
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
                placeholder="Enter your niche or keyword"
                className="w-full rounded-full border border-white/10 bg-[#15171A] py-4 pl-12 pr-5 text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] outline-none transition-shadow placeholder:text-white/30"
                onFocus={function (e) {
                  e.target.style.borderColor = "var(--color-accent)";
                }}
                onBlur={function (e) {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
            </div>
            <div className="relative inline-block">
              <button
                type="submit"
                className="rounded-full px-8 py-4 font-bold uppercase tracking-wide text-white transition-colors"
                style={{ backgroundColor: "var(--color-accent)" }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.backgroundColor = "var(--color-accent-hover)";
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.backgroundColor = "var(--color-accent)";
                }}
              >
                Find Subreddits
              </button>
              <img
                src="/brand/wolf-icon.png"
                alt=""
                aria-hidden="true"
                className="wolf-float-icon pointer-events-none absolute -right-2 -top-2 h-9 w-9 rounded-full sm:-right-3 sm:-top-3 sm:h-10 sm:w-10"
              />
            </div>
          </form>
        </div>

        {!isLoggedIn && (
          <div className="mx-auto mt-6 max-w-xs">
            <p className="text-center text-xs text-white/40">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="hover:underline" style={{ color: "var(--color-accent)" }}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="hover:underline" style={{ color: "var(--color-accent)" }}>
                Privacy Policy
              </Link>
              .
            </p>

            <a
              href={"/api/auth/google?next=" + encodeURIComponent("/dashboard")}
              className="mt-4 flex items-center justify-center gap-3 rounded-full border border-white/10 bg-[#15171A] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-white/5"
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
        )}

        <div
          className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
          style={{
            borderColor: "var(--color-accent-soft)",
            backgroundColor: "var(--color-accent-soft)",
            color: "var(--color-accent)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
          Powered By Real Reddit Data
        </div>

        <div className="mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/35">
          <a
            href="https://twitter.com/WolfofReddits"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white/70"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @WolfofReddits
          </a>
          <Link href="/privacy" className="hover:text-white/70">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white/70">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
