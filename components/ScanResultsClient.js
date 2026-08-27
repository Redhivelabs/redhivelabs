"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteNav from "./SiteNav.js";
import PayPalButton from "./PayPalButton.js";

function hasScannedBefore() {
  return document.cookie
    .split("; ")
    .some((row) => row.startsWith("wolf_scanned="));
}

function markScanned() {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = "wolf_scanned=true; path=/; max-age=" + oneYear;
}

const loadingMessages = [
  "Scanning Reddit...",
  "Finding real conversations...",
  "Checking subreddit activity...",
  "Classifying buyer intent...",
  "Almost there...",
];

const intentStyles = {
  BUYING: { bg: "rgba(255, 106, 26, 0.1)", color: "#FF6A1A", label: "Buying Intent" },
  DISCUSSION: { bg: "rgba(224, 165, 66, 0.1)", color: "#E0A542", label: "Discussion" },
  CURIOSITY: { bg: "rgba(255, 255, 255, 0.06)", color: "rgba(255,255,255,0.5)", label: "Curiosity" },
};

function opportunityColor(score) {
  if (score >= 70) return "#FF6A1A";
  if (score >= 40) return "#E0A542";
  return "#E2564C";
}

export default function ScanResultsClient({ keyword }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gated, setGated] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(function () {
      setMessageIndex(function (i) {
        return (i + 1) % loadingMessages.length;
      });
    }, 1600);
    return function () {
      clearInterval(interval);
    };
  }, [loading]);

  useEffect(() => {
    async function checkLoginAndFetch() {
      let loggedIn = false;
      try {
        const meRes = await fetch("/api/me");
        const meData = await meRes.json();
        loggedIn = meData.loggedIn;
        setIsLoggedIn(loggedIn);
      } catch (e) {
        loggedIn = false;
      }

      if (!loggedIn && hasScannedBefore()) {
        setTimeout(function () {
          setGated(true);
          setLoading(false);
        }, 2200);
        return;
      }

      fetchResults();
    }

    async function fetchResults() {
      try {
        const res = await fetch(
          "/api/scan-insights?keyword=" + encodeURIComponent(keyword)
        );
        const data = await res.json();
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }
        setResults(data.subreddits);
        setLoading(false);
        markScanned();
      } catch (err) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    }

    checkLoginAndFetch();
  }, [keyword]);

  const placeholderCards = [1, 2, 3, 4, 5];

  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #15171A 0%, #0D0E10 55%, #08090B 100%)",
      }}
    >
      <SiteNav />

      <div className="mx-auto mt-14 max-w-2xl">
        <Link
          href="/"
          className="text-sm font-medium hover:underline"
          style={{ color: "var(--color-accent)" }}
        >
          ← Back to search
        </Link>

        {loading && (
          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div
                className="loading-ring absolute inset-0 rounded-full border-2 border-white/10"
                style={{ borderTopColor: "var(--color-accent)" }}
              />
              <img
                src="/brand/wolf-icon.png"
                alt=""
                className="h-12 w-12 rounded-full"
              />
            </div>
            <p className="pulse-fade mt-6 text-sm font-medium text-white/50">
              {loadingMessages[messageIndex]}
            </p>
          </div>
        )}

        {gated && (
          <div className="relative mt-8">
            <div className="pointer-events-none flex flex-col gap-3 blur-sm select-none" aria-hidden="true">
              {placeholderCards.map(function (n) {
                return (
                  <div
                    key={n}
                    className="rounded-2xl border border-white/8 bg-[#15171A] p-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)" }}>
                          {n}
                        </span>
                        <span className="font-bold text-white">r/subreddit{n}</span>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
                        Score 80
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="w-full max-w-sm rounded-2xl border border-white/8 bg-[#191B1F] p-8 text-center shadow-[0_16px_48px_-12px_rgba(0,0,0,0.6)]">
                <p
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  Sign in to view your results
                </p>
                <p className="mt-2 text-sm text-white/50">
                  Your scan for &quot;{keyword}&quot; is ready. Sign in free to
                  see it and save it to your dashboard.
                </p>
                <a
                  href={"/api/auth/google?next=" + encodeURIComponent("/scan/" + keyword)}
                  className="mt-5 flex items-center justify-center gap-3 rounded-full border border-white/10 bg-[#15171A] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-white/5"
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
            </div>
          </div>
        )}

        {error && isLoggedIn && (
          <div className="mt-10 rounded-2xl border border-white/8 bg-[#191B1F] p-8 text-center shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]">
            <p
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {error}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/50">
              Your free scans reset in 24 hours. Want the full picture right
              now instead? Get the $49 report for this keyword — 10-15
              curated subreddits, no daily limit.
            </p>
            <Link
              href="/dashboard"
              className="mt-5 inline-block rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(255,106,26,0.5)] transition-all"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              View report options
            </Link>
          </div>
        )}

        {error && !isLoggedIn && (
          <div className="mt-10 rounded-2xl border border-white/8 bg-[#191B1F] p-8 text-center shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]">
            <p
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {error}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/50">
              Sign in free to keep scanning and save your results to your
              dashboard.
            </p>
            <a
              href={"/api/auth/google?next=" + encodeURIComponent("/scan/" + keyword)}
              className="mt-5 flex items-center justify-center gap-3 rounded-full border border-white/10 bg-[#15171A] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-white/5"
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

        {results && results.length === 0 && (
          <p className="mt-10 text-white/50">
            No subreddits found for this keyword. Try something broader.
          </p>
        )}

        {results && results.length > 0 && (
          <>
            <h1
              className="mt-6 text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Top subreddits for "{keyword}"
            </h1>
            <p className="mt-1 text-sm text-white/40">
              {results.length} communities found — free preview
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {results.map(function (r, i) {
                const oppColor = opportunityColor(r.opportunityScore);
                return (
                  <div
                    key={r.subreddit}
                    className="rounded-2xl border border-white/8 bg-[#15171A] p-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                          style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)", fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p
                            className="truncate font-bold text-white"
                            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                          >
                            r/{r.subreddit}
                          </p>
                          {r.subscribers && (
                            <p className="text-xs text-white/40">
                              {r.subscribers.toLocaleString()} subscribers
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 flex-col items-end">
                        <span
                          className="text-lg font-bold"
                          style={{ color: oppColor, fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          {r.opportunityScore}
                        </span>
                        <span className="text-[10px] uppercase tracking-wide text-white/35">
                          Wolf Score
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 pl-12">
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                        {r.activityLabel} activity
                      </span>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                        {r.moderationLabel} moderation
                      </span>
                      {r.googleRanking && r.googleRanking.ranking && (
                        <a
                          href={r.googleRanking.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full px-3 py-1 text-xs font-medium hover:underline"
                          style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)" }}
                        >
                          Ranks on Google
                        </a>
                      )}
                      {r.karmaRequired && (
                        <span className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: "var(--color-warn-soft)", color: "var(--color-warn)" }}>
                          Karma required
                        </span>
                      )}
                      {r.accountAgeRequired && (
                        <span className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: "var(--color-warn-soft)", color: "var(--color-warn)" }}>
                          Account age required
                        </span>
                      )}
                    </div>

                    {r.verdict && (
                      <div
                        className="mt-3 ml-12 flex items-start gap-2 rounded-xl p-3"
                        style={{
                          backgroundColor:
                            r.verdict.verdict === "post"
                              ? "rgba(255, 106, 26, 0.08)"
                              : r.verdict.verdict === "warm up first"
                              ? "rgba(224, 165, 66, 0.08)"
                              : "rgba(226, 86, 76, 0.08)",
                        }}
                      >
                        <span
                          className="mt-0.5 flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                          style={{
                            backgroundColor:
                              r.verdict.verdict === "post"
                                ? "#FF6A1A"
                                : r.verdict.verdict === "warm up first"
                                ? "#E0A542"
                                : "#E2564C",
                            color: "#FFFFFF",
                          }}
                        >
                          {r.verdict.verdict}
                        </span>
                        <p className="text-xs text-white/60">
                          {r.verdict.reasoning}
                        </p>
                      </div>
                    )}

                    {r.suggestedAngle && (
                      <p className="mt-3 ml-12 text-xs italic text-white/50">
                        “{r.suggestedAngle}”
                      </p>
                    )}

                    {r.questions && r.questions.length > 0 && (
                      <div className="mt-4 ml-12 flex flex-col gap-2">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-white/35">
                          Real questions from this subreddit
                        </p>
                        {r.questions.map(function (q, qi) {
                          const style = intentStyles[q.intent] || intentStyles.CURIOSITY;
                          return (
                            <a
                              key={qi}
                              href={q.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 rounded-xl border border-white/5 p-2.5 transition-colors hover:bg-white/[0.03]"
                            >
                              <span
                                className="mt-0.5 flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                                style={{ backgroundColor: style.bg, color: style.color }}
                              >
                                {style.label}
                              </span>
                              <span className="text-xs text-white/70">
                                {q.title}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className="mt-10 rounded-3xl border border-white/8 bg-[#15171A] p-8 text-center shadow-[0_24px_60px_-16px_rgba(0,0,0,0.5)] sm:p-10"
            >
              <div
                className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
                style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                Free preview
              </div>
              <p
                className="text-2xl font-extrabold text-white sm:text-3xl"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                {results.length} Communities Shown. More Are Hiding.
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                Full removal rates, posting windows, and real buyer questions
                for every subreddit that matters.
              </p>

              <div className="mx-auto mt-6 max-w-xs rounded-2xl bg-[#191B1F] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-medium uppercase tracking-wide text-white/60">
                    Reddit Intel Report
                  </span>
                  <span
                    className="text-2xl font-extrabold"
                    style={{ color: "var(--color-accent)", fontFamily: "var(--font-archivo), sans-serif" }}
                  >
                    $49
                  </span>
                </div>

                <div
                  className="mt-4 rounded-xl border bg-[#191B1F] p-3"
                  style={{ borderColor: "var(--color-accent-soft)" }}
                >
                  <PayPalButton orderType="report" keyword={keyword} quantity={1} />
                </div>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/50">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  Secure checkout via PayPal
                </div>
              </div>

              <p className="mt-4 text-xs text-white/50">
                {isLoggedIn
                  ? "You're signed in — we'll email you when it's ready, and it'll be waiting in your dashboard."
                  : "No account needed — we'll email your login link right after."}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
