"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  function handleScan(e) {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/scan/${encodeURIComponent(keyword.trim())}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#E9ECF0] px-6">
      <div className="w-full max-w-xl text-center">
        <img
          src="/lockup-horizontal.svg"
          alt="RedHiveLabs"
          className="mx-auto mb-8 h-10 w-auto"
        />
        <h1 className="text-4xl font-bold tracking-tight text-[#12171D] sm:text-5xl">
          Find where your customers already are
        </h1>
        <p className="mt-4 text-lg text-[#12171D]/70">
          Enter a keyword. We&apos;ll scan Reddit and show you the top 5
          subreddits where people are talking about it — free.
        </p>

        <form
          onSubmit={handleScan}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. skincare for sensitive skin"
            className="flex-1 rounded-full border border-[#12171D]/15 bg-white px-5 py-3 text-[#12171D] outline-none focus:border-[#0B6E62]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#0B6E62] px-6 py-3 font-medium text-white transition-colors hover:bg-[#0a5d53]"
          >
            Scan for free
          </button>
        </form>
      </div>
    </div>
  );
}