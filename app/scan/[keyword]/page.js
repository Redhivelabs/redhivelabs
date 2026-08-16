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

export default function ScanResults() {
  const params = useParams();
  const router = useRouter();
  const keyword = decodeURIComponent(params.keyword);

  const [results, setResults] = useState(null);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gated, setGated] = useState(false);

  useEffect(() => {
    if (hasScannedBefore()) {
      setGated(true);
      setLoading(false);
      router.push("/login?next=" + encodeURIComponent("/scan/" + keyword));
      return;
    }

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

        data.results.forEach(async (r) => {
          try {
            const detailRes = await fetch(
              "/api/subreddit?subreddit=" + encodeURIComponent(r.subreddit)
            );
            const detailData = await detailRes.json();
            setDetails((prev) => ({ ...prev, [r.subreddit]: detailData }));
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
      <div className="min-h-screen bg-[#E9ECF0] px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[#12171D]/60">Redirecting to sign up...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9ECF0] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-[#0B6E62] hover:underline">
          Back to search
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-[#12171D]">
          Top subreddits for {keyword}
        </h1>

        {loading && <p className="mt-8 text-[#12171D]/60">Scanning Reddit...</p>}

        {error && <p className="mt-8 text-[#98302A]">Error: {error}</p>}

        {results && results.length === 0 && (
          <p className="mt-8 text-[#12171D]/60">
            No subreddits found for this keyword. Try something broader.
          </p>
        )}

        {results && results.length > 0 && (
          <div className="mt-8 flex flex-col gap-3">
            {results.map((r, i) => {
              const d = details[r.subreddit];
              return (
                <div
                  key={r.subreddit}
                  className="rounded-xl bg-white px-5 py-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B6E62]/10 text-sm font-semibold text-[#0B6E62]">
                        {i + 1}
                      </span>
                      <span className="font-medium text-[#12171D]">
                        r/{r.subreddit}
                      </span>
                    </div>
                    <span className="text-sm text-[#12171D]/60">
                      {r.mentions} mentions
                    </span>
                  </div>

                  {!d && (
                    <p className="mt-2 pl-11 text-xs text-[#12171D]/40">
                      Loading details...
                    </p>
                  )}

                  {d && d.identity && (
                    <div className="mt-2 pl-11 text-xs text-[#12171D]/60">
                      <p>
                        {d.identity.subscribers
                          ? d.identity.subscribers.toLocaleString() +
                            " subscribers"
                          : "Subscriber count unavailable"}
                      </p>
                      <p className="mt-1">
                        Avg score: {d.traction && d.traction.medianScore} -
                        Avg comments: {d.traction && d.traction.medianComments}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-10 rounded-xl border border-[#0B6E62]/20 bg-[#0B6E62]/5 p-6 text-center">
          <p className="font-medium text-[#12171D]">
            Want the full placement report?
          </p>
          <p className="mt-1 text-sm text-[#12171D]/60">
            Rules, timing, removal risk, and a posting strategy - $99.
          </p>
          <div className="mt-4 flex justify-center">
            <div className="w-full max-w-xs">
              <PayPalButton keyword={keyword} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}