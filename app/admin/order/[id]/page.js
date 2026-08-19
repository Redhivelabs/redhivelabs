"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

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

export default function AdminOrderBuilder() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;

  const [competitors, setCompetitors] = useState("");
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);

  async function handleGenerate() {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderId, competitors: competitors }),
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

  function loadSampleData() {
    setReport({
      orderId: orderId,
      keyword: "skincare",
      generatedAt: new Date().toISOString(),
      strategy: {
        narrative:
          "r/SkincareAddicts and r/koreanskincare are your top priorities \u2014 both show strong opportunity scores with relaxed moderation, meaning your posts are far less likely to get removed. r/skincare_ph is a close third with genuine buying-intent questions already flowing through it.\n\nApproach r/SkincareAddiction carefully. Its 71% removal rate and strict moderation mean you should warm up with a few smaller, well-formatted posts before attempting anything promotional there.\n\nNo competitor mentions were flagged across any of these communities \u2014 you have a relatively clean field to establish your presence.",
      },
      subreddits: [
        {
          subreddit: "SkincareAddicts",
          mentions: 4,
          subscribers: 1053937,
          activityLabel: "Active",
          moderationLabel: "Relaxed",
          removalRatePercent: 17,
          karmaRequired: false,
          accountAgeRequired: false,
          googleRanking: { ranking: false },
          opportunityScore: 74,
          competitorMentioned: false,
          suggestedAngle: "Detailed troubleshooting posts with before/after context and specific product lists perform well here.",
          questions: [
            { title: "Help", url: "https://reddit.com/r/SkincareAddicts/comments/1vp8wfb/help/", score: 347, comments: 70, intent: "CURIOSITY" },
            { title: "3 months on tretinoin 0.025% cream and my skin looks worse", url: "https://reddit.com/r/SkincareAddicts/comments/1vos9wu/", score: 23, comments: 35, intent: "DISCUSSION" },
            { title: "Would I be a good candidate for microneedling?", url: "https://reddit.com/r/SkincareAddicts/comments/1vo14rh/", score: 18, comments: 72, intent: "CURIOSITY" },
          ],
          verdict: { verdict: "post", reasoning: "Low removal rate (17%) and no unusual restrictions detected. This subreddit looks approachable." },
        },
        {
          subreddit: "koreanskincare",
          mentions: 4,
          subscribers: 56031,
          activityLabel: "Active",
          moderationLabel: "Relaxed",
          removalRatePercent: 8,
          karmaRequired: false,
          accountAgeRequired: false,
          googleRanking: { ranking: false },
          opportunityScore: 77,
          competitorMentioned: false,
          suggestedAngle: "Insider knowledge, honest reviews, and product deep-dives resonate strongly with this community.",
          questions: [
            { title: "Products that finally helped my super sensitive rosacea skin", url: "https://reddit.com/r/koreanskincare/comments/1vo3ph6/", score: 114, comments: 28, intent: "DISCUSSION" },
            { title: "HELP WITH NEW ROUTINE", url: "https://reddit.com/r/koreanskincare/comments/1vome8t/", score: 84, comments: 29, intent: "BUYING" },
          ],
          verdict: { verdict: "post", reasoning: "Low removal rate (8%) and no unusual restrictions detected. This subreddit looks approachable." },
        },
        {
          subreddit: "SkincareAddiction",
          mentions: 3,
          subscribers: 4658888,
          activityLabel: "Active",
          moderationLabel: "Strict",
          removalRatePercent: 71,
          karmaRequired: false,
          accountAgeRequired: false,
          googleRanking: { ranking: false },
          opportunityScore: 50,
          competitorMentioned: false,
          suggestedAngle: "Well-structured routine breakdowns with specific concerns and ingredients listed get the most helpful responses.",
          questions: [
            { title: "[Routine Help] What is this condition and how can I manage it?", url: "https://reddit.com/r/SkincareAddiction/comments/1vp6b80/", score: 20, comments: 21, intent: "CURIOSITY" },
          ],
          verdict: { verdict: "avoid", reasoning: "High removal rate (71%) combined with strictly enforced rules makes this subreddit risky without significant prep." },
        },
      ],
    });
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
      a.download = "RedHiveLabs-" + report.keyword.replace(/\s+/g, "-") + "-report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      alert("Something went wrong downloading the PDF.");
    }
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
        <span
          className="rounded-full bg-[#0B6E62]/20 px-3 py-1 text-xs font-medium text-[#1FBFA8]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Admin
        </span>
      </nav>

      <div className="mx-auto mt-14 max-w-3xl">
        <Link href="/admin" className="text-sm font-medium text-[#0B6E62] hover:underline">
          &larr; Back to queue
        </Link>

        <h1
          className="mt-4 text-2xl font-bold text-[#12171D] sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Order #{orderId}
        </h1>

        {!report && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
            <label className="text-xs font-medium uppercase tracking-wide text-[#12171D]/70">
              Competitors (optional, comma-separated)
            </label>
            <input
              type="text"
              value={competitors}
              onChange={function (e) {
                setCompetitors(e.target.value);
              }}
              placeholder="e.g. CeraVe, La Roche-Posay"
              className="mt-2 w-full rounded-full border border-[#12171D]/15 px-5 py-3 text-[#12171D] outline-none placeholder:text-[#12171D]/40 focus:border-[#0B6E62]"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="rounded-full bg-[#0B6E62] px-8 py-3 font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53] disabled:opacity-50"
              >
                {generating ? "Generating... this can take a minute" : "Generate Report"}
              </button>
              <button
                onClick={loadSampleData}
                className="rounded-full border border-[#12171D]/15 px-6 py-3 text-sm font-medium text-[#12171D] hover:bg-[#12171D]/5"
              >
                Load Sample Data (for testing)
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl bg-[#98302A]/5 p-3">
                <p className="text-sm text-[#98302A]">{error}</p>
                {errorDetails && (
                  <p className="mt-1 text-xs text-[#98302A]/70">{errorDetails}</p>
                )}
              </div>
            )}
          </div>
        )}

        {report && (
          <div className="mt-6">
            <div className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
              <h2
                className="text-lg font-bold text-[#12171D]"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Strategy
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm text-[#12171D]/80">
                {report.strategy.narrative || "No narrative generated."}
              </p>
            </div>

            <h2
              className="mt-8 text-sm font-bold uppercase tracking-wide text-[#12171D]/70"
            >
              {report.subreddits.length} Subreddits (ranked)
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              {report.subreddits.map(function (r, i) {
                const oppColor = opportunityColor(r.opportunityScore);
                return (
                  <div
                    key={r.subreddit}
                    className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p
                          className="font-bold text-[#12171D]"
                          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          #{i + 1} r/{r.subreddit}
                        </p>
                        {r.subscribers && (
                          <p className="text-xs text-[#12171D]/50">
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
                      <span className="rounded-full bg-[#E9ECF0] px-3 py-1 text-xs text-[#12171D]/70">
                        {r.activityLabel} activity
                      </span>
                      <span className="rounded-full bg-[#E9ECF0] px-3 py-1 text-xs text-[#12171D]/70">
                        {r.moderationLabel} moderation
                      </span>
                      {r.googleRanking && r.googleRanking.ranking && (
                        <span className="rounded-full bg-[#0B6E62]/10 px-3 py-1 text-xs text-[#0B6E62]">
                          Ranks on Google
                        </span>
                      )}
                      {r.competitorMentioned && (
                        <span className="rounded-full bg-[#98302A]/10 px-3 py-1 text-xs font-medium text-[#98302A]">
                          Competitor mentioned
                        </span>
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
                      <p className="mt-3 text-xs text-[#12171D]/60">
                        <strong>{r.verdict.verdict}:</strong> {r.verdict.reasoning}
                      </p>
                    )}

                    {r.suggestedAngle && (
                      <p className="mt-2 text-xs italic text-[#12171D]/60">
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
                              className="flex items-start gap-2 rounded-lg p-1.5 text-xs hover:bg-[#12171D]/[0.02]"
                            >
                              <span
                                className="mt-0.5 flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
                                style={{ backgroundColor: style.bg, color: style.color }}
                              >
                                {style.label}
                              </span>
                              <span className="text-[#12171D]/70">{q.title}</span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-[#0B6E62]/20 bg-[#0B6E62]/5 p-6 text-center">
              <p className="text-sm text-[#12171D]/70">
                Review complete? Download the PDF when you're ready.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleDownloadPdf}
                  className="rounded-full bg-[#0B6E62] px-6 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53]"
                >
                  Download PDF
                </button>
                <button
                  onClick={function () {
                    setReport(null);
                  }}
                  className="rounded-full border border-[#12171D]/15 px-6 py-2 text-sm font-medium text-[#12171D] hover:bg-[#12171D]/5"
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
