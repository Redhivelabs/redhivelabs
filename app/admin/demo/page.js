"use client";

import { useState } from "react";
import Link from "next/link";

const intentStyles = {
  BUYING: { bg: "rgba(255, 106, 26, 0.1)", color: "#FF6A1A", label: "Buying Intent" },
  DISCUSSION: { bg: "rgba(224, 165, 66, 0.1)", color: "#E0A542", label: "Discussion" },
  CURIOSITY: { bg: "rgba(255, 255, 255, 0.06)", color: "rgba(255,255,255,0.6)", label: "Curiosity" },
};

function opportunityColor(score) {
  if (score >= 70) return "#FF6A1A";
  if (score >= 40) return "#E0A542";
  return "#E2564C";
}

export default function AdminDemoBuilder() {
  const [keyword, setKeyword] = useState("");
  const [client, setClient] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);

  async function handleGenerate() {
    if (!keyword.trim()) {
      setError("Enter a keyword first.");
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/generate-report-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword, competitors: competitors, client: client }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setErrorDetails(data.details || null);
        setGenerating(false);
        return;
      }
      setReport(data);
      setGenerating(false);
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setGenerating(false);
    }
  }

  async function handleDownloadPdf() {
    if (!report) return;
    try {
      const res = await fetch("/api/admin/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(
          "PDF generation failed: " +
            (data.error || "unknown error") +
            "\n\n" +
            (data.details || "")
        );
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "WolfOfReddit-" + report.keyword.replace(/\s+/g, "-") + "-DEMO-report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      alert("Something went wrong downloading the PDF.");
    }
  }

  function handleRegenerate() {
    setReport(null);
    setError(null);
  }

  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #15171A 0%, #0D0E10 55%, #08090B 100%)",
      }}
    >
      <nav className="mx-auto mt-6 flex max-w-4xl items-center justify-between gap-2 rounded-full border border-white/8 bg-[#15171A] px-3 py-1.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] sm:gap-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/brand/wolf-icon.png"
            alt="Wolf of Reddit"
            className="h-8 w-8 flex-shrink-0 rounded-full"
          />
          <span
            className="inline-flex items-baseline gap-1.5 text-sm font-extrabold tracking-tight text-white"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            <span>WOLF</span>
            <span>OF</span>
            <span style={{ color: "var(--color-accent)" }}>REDDIT</span>
          </span>
        </Link>
        <div className="flex items-center gap-4 text-xs font-medium" style={{ fontFamily: "var(--font-archivo), sans-serif" }}>
          <Link href="/admin" className="text-white/50 hover:text-white">
            Order Queue
          </Link>
          <Link href="/admin/users" className="text-white/50 hover:text-white">
            Users
          </Link>
          <span className="rounded-full bg-[#FF6A1A]/15 px-3 py-1 font-medium text-[#FF6A1A]">
            Demo
          </span>
        </div>
      </nav>

      <div className="mx-auto mt-14 max-w-3xl">
        <Link href="/admin" className="text-sm font-medium text-[#FF6A1A] hover:underline">
          &larr; Back to queue
        </Link>

        <h1
          className="mt-4 text-2xl font-bold text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Demo Report Builder
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Generate a report for any keyword. Not tied to a real order &mdash; nothing is saved.
        </p>

        {!report && (
          <div className="mt-6 rounded-2xl border border-white/8 bg-[#15171A] p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]">
            <label className="text-xs font-medium uppercase tracking-wide text-white/70">
              Keyword
            </label>
            <input
              type="text"
              value={keyword}
              onChange={function (e) {
                setKeyword(e.target.value);
              }}
              placeholder="e.g. skincare"
              className="mt-2 w-full rounded-full border border-white/15 px-5 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#FF6A1A]"
            />

            <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-white/70">
              Client (optional, shown on the report cover)
            </label>
            <input
              type="text"
              value={client}
              onChange={function (e) {
                setClient(e.target.value);
              }}
              placeholder="e.g. MIMIQ"
              className="mt-2 w-full rounded-full border border-white/15 px-5 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#FF6A1A]"
            />

            <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-white/70">
              Competitors (optional, comma-separated)
            </label>
            <input
              type="text"
              value={competitors}
              onChange={function (e) {
                setCompetitors(e.target.value);
              }}
              placeholder="e.g. CeraVe, La Roche-Posay"
              className="mt-2 w-full rounded-full border border-white/15 px-5 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#FF6A1A]"
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="rounded-full bg-[#FF6A1A] px-8 py-3 font-medium text-white shadow-[0_8px_20px_-6px_rgba(255,106,26,0.5)] transition-all hover:bg-[#E85A0C] disabled:opacity-50"
              >
                {generating ? "Generating... this can take a minute" : "Generate Report"}
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl bg-[#E2564C]/5 p-3">
                <p className="text-sm text-[#E2564C]">{error}</p>
                {errorDetails && (
                  <p className="mt-1 text-xs text-[#E2564C]/70">{errorDetails}</p>
                )}
              </div>
            )}
          </div>
        )}

        {report && (
          <div className="mt-6">
            <div className="rounded-2xl border border-white/8 bg-[#15171A] p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]">
              <h2
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Strategy
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm text-white/80">
                {report.strategy.narrative || "No narrative generated."}
              </p>
            </div>

            <h2
              className="mt-8 text-sm font-bold uppercase tracking-wide text-white/70"
            >
              {report.subreddits.length} Subreddits (ranked)
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              {report.subreddits.map(function (r, i) {
                const oppColor = opportunityColor(r.opportunityScore);
                return (
                  <div
                    key={r.subreddit}
                    className="rounded-2xl border border-white/8 bg-[#15171A] p-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p
                          className="font-bold text-white"
                          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          #{i + 1} r/{r.subreddit}
                        </p>
                        {r.subscribers && (
                          <p className="text-xs text-white/50">
                            {r.subscribers.toLocaleString()} subscribers
                          </p>
                        )}
                      </div>
                      <span
                        className="text-lg font-bold"
                        style={{ color: oppColor, fontFamily: "var(--font-archivo), sans-serif" }}
                      >
                        {r.opportunityScore}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                        {r.activityLabel} activity
                      </span>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                        {r.moderationLabel} moderation
                      </span>
                      {r.googleRanking && r.googleRanking.ranking && (
                        <span className="rounded-full bg-[#FF6A1A]/10 px-3 py-1 text-xs text-[#FF6A1A]">
                          Ranks on Google
                        </span>
                      )}
                      {r.competitorMentioned && (
                        <span className="rounded-full bg-[#E2564C]/10 px-3 py-1 text-xs font-medium text-[#E2564C]">
                          Competitor mentioned
                        </span>
                      )}
                      {r.karmaRequired && (
                        <span className="rounded-full bg-[#E0A542]/10 px-3 py-1 text-xs text-[#E0A542]">
                          Karma required
                        </span>
                      )}
                      {r.accountAgeRequired && (
                        <span className="rounded-full bg-[#E0A542]/10 px-3 py-1 text-xs text-[#E0A542]">
                          Account age required
                        </span>
                      )}
                    </div>

                    {r.verdict && (
                      <p className="mt-3 text-xs text-white/60">
                        <strong>{r.verdict.verdict}:</strong> {r.verdict.reasoning}
                      </p>
                    )}

                    {r.suggestedAngle && (
                      <p className="mt-2 text-xs italic text-white/60">
                        &ldquo;{r.suggestedAngle}&rdquo;
                      </p>
                    )}

                    {r.questions && r.questions.length > 0 && (
                      <div className="mt-3 flex flex-col gap-1.5">
                        {r.questions.map(function (q, qi) {
                          const style = intentStyles[q.intent] || intentStyles.CURIOSITY;
                          return (
                            <a
                              key={qi}
                              href={q.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 rounded-lg p-1.5 text-xs hover:bg-white/[0.03]"
                            >
                              <span
                                className="mt-0.5 flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
                                style={{ backgroundColor: style.bg, color: style.color }}
                              >
                                {style.label}
                              </span>
                              <span className="text-white/70">{q.title}</span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-[#FF6A1A]/20 bg-[#FF6A1A]/5 p-6 text-center">
              <p className="text-sm text-white/70">
                Review complete? Download the PDF when you're ready.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleDownloadPdf}
                  className="rounded-full bg-[#FF6A1A] px-6 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(255,106,26,0.5)] transition-all hover:bg-[#E85A0C]"
                >
                  Download PDF
                </button>
                <button
                  onClick={handleRegenerate}
                  className="rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white hover:bg-white/5"
                >
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
