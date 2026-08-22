"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteNav from "./SiteNav.js";
import PayPalButton from "./PayPalButton.js";

function hasScannedBefore() {
  return document.cookie
    .split("; ")
    .some((row) => row.startsWith("redhive_scanned="));
}

function markScanned() {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = "redhive_scanned=true; path=/; max-age=" + oneYear;
}

const loadingMessages = [
  "Scanning Reddit...",
  "Finding real conversations...",
  "Checking subreddit activity...",
  "Classifying buyer intent...",
  "Almost there...",
];

const intentStyles = {
  BUYING: { bg: "rgba(11, 110, 98, 0.1)", color: "#0B6E62", label: "Buying Intent" },
  DISCUSSION: { bg: "rgba(143, 93, 12, 0.1)", color: "#8F5D0C", label: "Discussion" },
  CURIOSITY: { bg: "rgba(18, 23, 29, 0.06)", color: "#12171D99", label: "Curiosity" },
};

function opportunityColor(score) {
  if (score >= 70) return "#0B6E62";
  if (score >= 40) return "#8F5D0C";
  return "#98302A";
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
          "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
      }}
    >
      <SiteNav />

      <div className="mx-auto mt-14 max-w-2xl">
        <Link
          href="/"
          className="text-sm font-medium text-[#0B6E62] hover:underline"
        >
          ← Back to search
        </Link>

        {loading && (
          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <svg viewBox="0 0 100 100" width="72" height="72" fill="none">
              <polygon
                points="84.64,70.00 50.00,90.00 15.36,70.00 15.36,30.00 50.00,10.00 84.64,30.00"
                fill="none"
                stroke="#12171D"
                strokeWidth="6"
                strokeLinejoin="round"
                opacity="0.2"
              />
              <rect className="bar-1" x="28" y="31" width="17" height="8" rx="1.5" fill="#12171D" />
              <rect className="bar-2" x="28" y="41" width="29" height="8" rx="1.5" fill="#12171D" />
              <rect className="bar-3" x="28" y="51" width="40" height="8" rx="1.5" fill="#0B6E62" />
              <rect className="bar-4" x="28" y="61" width="23" height="8" rx="1.5" fill="#12171D" />
            </svg>
            <p className="pulse-fade mt-6 text-sm font-medium text-[#12171D]/60">
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
                    className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B6E62]/10 text-sm font-bold text-[#0B6E62]">
                          {n}
                        </span>
                        <span className="font-bold text-[#12171D]">r/subreddit{n}</span>
                      </div>
                      <span className="rounded-full bg-[#12171D]/5 px-3 py-1 text-xs font-medium text-[#12171D]/60">
                        Score 80
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-[0_16px_48px_-12px_rgba(18,23,29,0.35)]">
                <p
                  className="text-lg font-bold text-[#12171D]"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  Sign in to view your results
                </p>
                <p className="mt-2 text-sm text-[#12171D]/60">
                  Your scan for &quot;{keyword}&quot; is ready. Sign in free to
                  see it and save it to your dashboard.
                </p>
                <a
                  href={"/api/auth/google?next=" + encodeURIComponent("/scan/" + keyword)}
                  className="mt-5 flex items-center justify-center gap-3 rounded-full border border-[#12171D]/15 bg-white px-6 py-3 font-medium text-[#12171D] shadow-sm transition-colors hover:bg-[#12171D]/5"
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
          <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
            <p
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {error}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[#12171D]/60">
              Your free scans reset in 24 hours. Want the full picture right
              now instead? Get the $49 report for this keyword — 10-15
              curated subreddits, no daily limit.
            </p>
            <Link
              href="/dashboard"
              className="mt-5 inline-block rounded-full bg-[#0B6E62] px-8 py-3 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53]"
            >
              View report options
            </Link>
          </div>
        )}

        {error && !isLoggedIn && (
          <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
            <p
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {error}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[#12171D]/60">
              Sign in free to keep scanning and save your results to your
              dashboard.
            </p>
            <a
              href={"/api/auth/google?next=" + encodeURIComponent("/scan/" + keyword)}
              className="mt-5 flex items-center justify-center gap-3 rounded-full border border-[#12171D]/15 bg-white px-6 py-3 font-medium text-[#12171D] shadow-sm transition-colors hover:bg-[#12171D]/5"
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
          <p className="mt-10 text-[#12171D]/60">
            No subreddits found for this keyword. Try something broader.
          </p>
        )}

        {results && results.length > 0 && (
          <>
            <h1
              className="mt-6 text-2xl font-bold text-[#12171D] sm:text-3xl"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Top subreddits for "{keyword}"
            </h1>
            <p className="mt-1 text-sm text-[#12171D]/50">
              {results.length} communities found — free preview
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {results.map(function (r, i) {
                const oppColor = opportunityColor(r.opportunityScore);
                return (
                  <div
                    key={r.subreddit}
                    className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]"
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-sm font-bold text-[#0B6E62]"
                          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p
                            className="truncate font-bold text-[#12171D]"
                            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                          >
                            r/{r.subreddit}
                          </p>
                          {r.subscribers && (
                            <p className="text-xs text-[#12171D]/50">
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
                        <span className="text-[10px] uppercase tracking-wide text-[#12171D]/40">
                          Opportunity
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 pl-12">
                      <span className="rounded-full bg-[#E9ECF0] px-3 py-1 text-xs text-[#12171D]/70">
                        {r.activityLabel} activity
                      </span>
                      <span className="rounded-full bg-[#E9ECF0] px-3 py-1 text-xs text-[#12171D]/70">
                        {r.moderationLabel} moderation
                      </span>
                      {r.googleRanking && r.googleRanking.ranking && (
                        <a
                          href={r.googleRanking.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-[#0B6E62]/10 px-3 py-1 text-xs font-medium text-[#0B6E62] hover:underline"
                        >
                          Ranks on Google
                        </a>
                      )}
                      {r.karmaRequired && (
                        <span className="rounded-full bg-[#8F5D0C]/10 px-3 py-1 text-xs text-[#8F5D0C]">
                          Karma required
                        </span>
                      )}
                      {r.accountAgeRequired && (
                        <span className="rounded-full bg-[#8F5D0C]/10 px-3 py-1 text-xs text-[#8F5D0C]">
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
                              ? "rgba(11, 110, 98, 0.08)"
                              : r.verdict.verdict === "warm up first"
                              ? "rgba(143, 93, 12, 0.08)"
                              : "rgba(152, 48, 42, 0.08)",
                        }}
                      >
                        <span
                          className="mt-0.5 flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                          style={{
                            backgroundColor:
                              r.verdict.verdict === "post"
                                ? "#0B6E62"
                                : r.verdict.verdict === "warm up first"
                                ? "#8F5D0C"
                                : "#98302A",
                            color: "#FFFFFF",
                          }}
                        >
                          {r.verdict.verdict}
                        </span>
                        <p className="text-xs text-[#12171D]/70">
                          {r.verdict.reasoning}
                        </p>
                      </div>
                    )}

                    {r.suggestedAngle && (
                      <p className="mt-3 ml-12 text-xs italic text-[#12171D]/60">
                        “{r.suggestedAngle}”
                      </p>
                    )}

                    {r.questions && r.questions.length > 0 && (
                      <div className="mt-4 ml-12 flex flex-col gap-2">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#12171D]/40">
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
                              className="flex items-start gap-2 rounded-xl border border-[#12171D]/5 p-2.5 transition-colors hover:bg-[#12171D]/[0.02]"
                            >
                              <span
                                className="mt-0.5 flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                                style={{ backgroundColor: style.bg, color: style.color }}
                              >
                                {style.label}
                              </span>
                              <span className="text-xs text-[#12171D]/80">
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
              className="mt-10 rounded-3xl p-8 text-center sm:p-10"
              style={{
                background:
                  "radial-gradient(140% 120% at 10% 0%, #14A08C 0%, #0B6E62 32%, #063D37 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 60px -16px rgba(11,110,98,0.45)",
              }}
            >
              <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1FBFA8]" />
                Free preview
              </div>
              <p
                className="text-2xl font-extrabold text-white sm:text-3xl"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                You Just Saw Few. One of Them Gets You Removed.
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                Real Removal Rates. The exact days and hours to post. Reviewed
                by Human, not a Bot.
              </p>

              <div className="mx-auto mt-6 max-w-xs rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-medium uppercase tracking-wide text-white/60">
                    Reddit Intel Report
                  </span>
                  <span
                    className="text-2xl font-extrabold text-white"
                    style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                  >
                    $49
                  </span>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-white p-3">
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
                No account needed — we&apos;ll email your login link right
                after.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
