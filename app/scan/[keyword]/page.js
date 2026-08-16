"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ScanResults() {
  const params = useParams();
  const keyword = decodeURIComponent(params.keyword);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch(
          "/api/scan?keyword=" + encodeURIComponent(keyword)
        );
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setResults(data.results);
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [keyword]);

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
            {results.map((r, i) => (
              <div
                key={r.subreddit}
                className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm"
              >
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
            ))}
          </div>
        )}

        <div className="mt-10 rounded-xl border border-[#0B6E62]/20 bg-[#0B6E62]/5 p-6 text-center">
          <p className="font-medium text-[#12171D]">
            Want the full placement report?
          </p>
          <p className="mt-1 text-sm text-[#12171D]/60">
            Rules, timing, removal risk, and a posting strategy - $99.
          </p>
        </div>
      </div>
    </div>
  );
}
