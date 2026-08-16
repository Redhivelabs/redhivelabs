"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PayPalButton from "../../../components/PayPalButton.js";

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
  "Almost there...",
];

export default function ScanResults() {
  const params = useParams();
  const router = useRouter();
  const keyword = decodeURIComponent(params.keyword);

  const [results, setResults] = useState(null);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gated, setGated] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(function () {
      setMessageIndex(function (i) {
        return (i + 1) % loadingMessages.length;
      });
    }, 1400);
    return function () {
      clearInterval(interval);
    };
  }, [loading]);

  useEffect(() => {
    // Gate temporarily disabled for testing — re-enable by uncommenting below
    // if (hasScannedBefore()) {
    //   setGated(true);
    //   setLoading(false);
    //   router.push("/login?next=" + encodeURIComponent("/scan/" + keyword));
    //   return;
    // }

    async function fetchResults() {
      try {
        const res = await fetch(
          "/api/scan?keyword=" + encodeURIComponent(keyword)
        );
        const data = await res.json();
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }
        setResults(data.results);
        setLoading(false);
        markScanned();

        data.results.forEach(async function (r) {
          try {
            const detailRes = await fetch(
              "/api/subreddit?subreddit=" + encodeURIComponent(r.subreddit)
            );
            const detailData = await detailRes.json();
            setDetails(function (prev) {
              return { ...prev, [r.subreddit]: detailData };
            });
          } catch (e) {
            // Silently skip if one subreddit's details fail
          }
        });
      } catch (err) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    }
    fetchResults();
  }, [keyword, router]);

  if (gated) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-6"
        style={{
          background:
            "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
        }}
      >
        <p className="text-[#12171D]/60">Redirecting to sign up...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
      }}
    >
      <nav className="mx-auto mt-6 flex max-w-4xl items-center justify-between gap-2 rounded-full bg-[#12171D] px-3 py-1.5 shadow-[0_8px_24px_-8px_rgba(18,23,29,0.4)] sm:gap-3 sm:px-6">
        <Link href="/">
          <img
            src="/lockup-horizontal-white.svg"
            alt="RedHiveLabs"
            className="w-auto flex-shrink-0"
            style={{ height: "32px" }}
          />
        </Link>
        <div
          className="flex items-center gap-2 text-[11px] font-medium text-white/70 sm:gap-6 sm:text-sm"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          <Link href="/features" className="hover:text-white">
            Features
          </Link>
          <Link href="/sample" className="hover:text-white">
            Sample
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
        </div>
      </nav>

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

        {error && (
          <p className="mt-10 rounded-xl bg-[#98302A]/5 p-4 text-sm text-[#98302A]">
            {error}
          </p>
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

            <div className="mt-8 flex flex-col gap-3">
              {results.map(function (r, i) {
                const d = details[r.subreddit];
                return (
                  <div
                    key={r.subreddit}
                    className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)] transition-shadow hover:shadow-[0_8px_28px_-8px_rgba(18,23,29,0.2)]"
                  >
                    <div className="flex min-w-0 items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-sm font-bold text-[#0B6E62]"
                          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          {i + 1}
                        </span>
                        <span
                          className="truncate font-bold text-[#12171D]"
                          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          r/{r.subreddit}
                        </span>
                      </div>
                      <span className="flex-shrink-0 rounded-full bg-[#12171D]/5 px-3 py-1 text-xs font-medium text-[#12171D]/60">
                        {r.mentions} mentions
                      </span>
                    </div>

                    {!d && (
                      <p className="pulse-fade mt-3 pl-12 text-xs text-[#12171D]/40">
                        Analyzing this community...
                      </p>
                    )}

                    {d && d.identity && (
                      <div
                        key={r.subreddit + "-loaded"}
                        className="fade-in-detail mt-3 pl-12"
                      >
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#E9ECF0] px-3 py-1 text-xs text-[#12171D]/70">
                            {d.identity.subscribers
                              ? d.identity.subscribers.toLocaleString() +
                                " subscribers"
                              : "Subscribers unavailable"}
                          </span>
                          <span className="rounded-full bg-[#E9ECF0] px-3 py-1 text-xs text-[#12171D]/70">
                            Avg score {d.traction && d.traction.medianScore}
                          </span>
                          <span className="rounded-full bg-[#E9ECF0] px-3 py-1 text-xs text-[#12171D]/70">
                            Avg comments{" "}
                            {d.traction && d.traction.medianComments}
                          </span>
                        </div>

                        {d.verdict && (
                          <div
                            className="mt-3 flex items-start gap-2 rounded-xl p-3"
                            style={{
                              backgroundColor:
                                d.verdict.verdict === "post"
                                  ? "rgba(11, 110, 98, 0.08)"
                                  : d.verdict.verdict === "warm up first"
                                  ? "rgba(143, 93, 12, 0.08)"
                                  : "rgba(152, 48, 42, 0.08)",
                            }}
                          >
                            <span
                              className="mt-0.5 flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                              style={{
                                backgroundColor:
                                  d.verdict.verdict === "post"
                                    ? "#0B6E62"
                                    : d.verdict.verdict === "warm up first"
                                    ? "#8F5D0C"
                                    : "#98302A",
                                color: "#FFFFFF",
                              }}
                            >
                              {d.verdict.verdict}
                            </span>
                            <p className="text-xs text-[#12171D]/70">
                              {d.verdict.reasoning}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className="mt-10 rounded-2xl p-8 text-center shadow-[0_16px_40px_-12px_rgba(11,110,98,0.35)]"
              style={{
                background: "linear-gradient(180deg, #12171D 0%, #0B1410 100%)",
              }}
            >
              <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-[#0B6E62]/20 px-3 py-1 text-xs font-medium text-[#1FBFA8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1FBFA8]" />
                Full Placement Report
              </div>
              <p
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Get the full picture
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
                10-15 curated subreddits, posting rules, removal risk, best
                times to post, and real evidence — one report, $99 USD.
              </p>
              <div className="mx-auto mt-6 w-full max-w-xs rounded-xl bg-white p-3 shadow-lg">
                <PayPalButton keyword={keyword} />
              </div>
              <p className="mt-3 text-xs text-white/30">
                Secure checkout via PayPal
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
