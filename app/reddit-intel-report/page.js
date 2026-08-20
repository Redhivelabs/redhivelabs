import Link from "next/link";
import SiteNav from "../../components/SiteNav.js";

export const metadata = {
  title: "Reddit Intel Report — Know Before You Post | RedHiveLabs",
  description:
    "Removed, shadowbanned, ignored — not a bad post, just the wrong subreddit. Get the exact subreddits, moderators, and days that work for your keyword, before you post.",
};

function Eyebrow({ children }) {
  return (
    <p
      className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B6E62]"
      style={{ fontFamily: "var(--font-archivo), sans-serif" }}
    >
      {children}
    </p>
  );
}

function CTAButton({ children, href = "/dashboard?order=report", subtle = false }) {
  if (subtle) {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#0B6E62] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] transition-all hover:bg-white/90"
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B6E62] px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_-12px_rgba(11,110,98,0.55)] transition-all hover:bg-[#0a5d53]"
      style={{ fontFamily: "var(--font-archivo), sans-serif" }}
    >
      {children}
    </Link>
  );
}

const PAIN_POINTS = [
  "You spent an hour on the post. Removed in four minutes. Back to zero.",
  "Zero upvotes, zero comments, zero explanation. Shadowbanned, probably. Back to zero.",
  "Third rejected post this week. Account's flagged as spam now. Back to zero.",
];

const IN_SCOPE = [
  "Exact removal rate for every subreddit on your list",
  "Which posting rules actually get enforced (karma, account age, self-promo, flair)",
  "The days and hours top posts in that subreddit actually went up",
  "A ready-made angle for your exact keyword — not a template",
  "Real questions people are already asking there, so you know what to write",
];

const OUT_OF_SCOPE = [
  "A guarantee your post goes viral",
  "Someone posting it for you — that's a different service",
  "Reddit ads or paid promotion",
];

const FAQS = [
  {
    q: "Will this get my account banned?",
    a: "No. Reading a PDF has never gotten anyone banned. It exists so you don't.",
  },
  {
    q: "I've never posted on Reddit. Is this for me?",
    a: "Especially for you. It tells you which subreddits are forgiving of new, low-karma accounts — before you find out the hard way.",
  },
  {
    q: "How fast do I get it?",
    a: "A real person checks it before it goes out, so not instant. You'll get an email the second it's ready.",
  },
  {
    q: "Is this a subscription?",
    a: "$49. Once. No recurring anything.",
  },
  {
    q: "Can I get one for a different keyword later?",
    a: "Order another report. Same price, same process.",
  },
];

export default function RedditIntelReportPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(function (item) {
      return {
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      };
    }),
  };

  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteNav />

      {/* HERO */}
      <div className="mx-auto mt-20 max-w-2xl text-center">
        <Eyebrow>Reddit Intel Report</Eyebrow>
        <h1
          className="mt-4 text-4xl font-extrabold leading-tight text-[#12171D] sm:text-6xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Removed. Shadowbanned. Ignored.
        </h1>
        <p
          className="mx-auto mt-4 max-w-xl text-xl font-bold text-[#12171D]/80"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Wrong subreddit, wrong moderator, wrong day — not a bad post.
        </p>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#12171D]/70">
          We find the right subreddit, the right moderator, the right day —
          before you post, not after.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <CTAButton>Show me the good subreddits — $49*</CTAButton>
          <p className="max-w-sm text-xs text-[#12171D]/40">
            * No more guessing. No more &quot;removed, no reason given.&quot; Just the
            subreddits that&apos;ll actually let your post breathe.
          </p>
        </div>
      </div>

      {/* PAIN */}
      <div className="mx-auto mt-24 max-w-2xl">
        <Eyebrow>You already know this part</Eyebrow>
        <h2
          className="mt-3 text-2xl font-bold text-[#12171D] sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Reddit doesn&apos;t tell you the rules. It just enforces them on you.
        </h2>

        <div className="mt-8 flex flex-col gap-3">
          {PAIN_POINTS.map(function (p) {
            return (
              <div
                key={p}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]"
              >
                <span className="mt-0.5 text-[#98302A]">✕</span>
                <p className="text-sm leading-relaxed text-[#12171D]/75">{p}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-base leading-relaxed text-[#12171D]/70">
          Meanwhile, somewhere in your exact niche, there&apos;s a subreddit with a
          real audience and a moderator who barely lifts a finger. You just don&apos;t
          know which one. That&apos;s the whole job of this report.
        </p>
      </div>

      {/* WHAT'S IN / WHAT'S NOT */}
      <div className="mx-auto mt-24 max-w-3xl">
        <div className="text-center">
          <Eyebrow>The honest version</Eyebrow>
          <h2
            className="mt-3 text-2xl font-bold text-[#12171D] sm:text-3xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            What&apos;s actually in it. And what isn&apos;t.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#0B6E62]/15 bg-white p-6">
            <h3
              className="text-sm font-bold uppercase tracking-wide text-[#0B6E62]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              What&apos;s in the report
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {IN_SCOPE.map(function (item) {
                return (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#12171D]/75">
                    <span className="mt-0.5 text-[#0B6E62]">✓</span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#12171D]/10 bg-white p-6">
            <h3
              className="text-sm font-bold uppercase tracking-wide text-[#12171D]/50"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              What it&apos;s not
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {OUT_OF_SCOPE.map(function (item) {
                return (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#12171D]/50">
                    <span className="mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="mx-auto mt-24 max-w-3xl">
        <div className="text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2
            className="mt-3 text-2xl font-bold text-[#12171D] sm:text-3xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Three steps. That&apos;s it.
          </h2>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            { n: "1", t: "Give us your keyword" },
            { n: "2", t: "We run the recon — real posts, real removal data, real timing" },
            { n: "3", t: "Report lands in your inbox, ready to act on" },
          ].map(function (step) {
            return (
              <div key={step.n} className="text-center">
                <span
                  className="text-3xl font-extrabold text-[#0B6E62]"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {step.n}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-[#12171D]/70">
                  {step.t}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* THE ALTERNATIVE (blunt reframe) */}
      <div className="mx-auto mt-24 max-w-2xl text-center">
        <p className="text-base leading-relaxed text-[#12171D]/60">
          Or — keep posting blind. Write it, cross your fingers, get removed,
          blame the algorithm, try again next week. That works too, technically.
        </p>
      </div>

      {/* PRICING CTA BLOCK */}
      <div className="mx-auto mt-16 max-w-2xl">
        <div
          className="rounded-3xl p-10 text-center"
          style={{
            background:
              "radial-gradient(140% 120% at 10% 0%, #14A08C 0%, #0B6E62 32%, #063D37 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 60px -16px rgba(11,110,98,0.45)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.14em] text-white/70"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Reddit Intel Report
          </p>
          <p
            className="mt-3 text-5xl font-extrabold text-white"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            $49
          </p>
          <p className="mt-2 text-sm text-white/70">
            One keyword. One report. One-time payment.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton subtle href="/dashboard?order=report">
              Get Your Report
            </CTAButton>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-24 max-w-xl">
        <div className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            className="mt-3 text-2xl font-bold text-[#12171D] sm:text-3xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Quick answers
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {FAQS.map(function (item) {
            return (
              <div key={item.q}>
                <h3
                  className="text-sm font-bold text-[#12171D]"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {item.q}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#12171D]/65">
                  {item.a}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELF-AWARE CLOSER */}
      <div className="mx-auto mt-24 max-w-xl text-center">
        <p
          className="text-xl font-bold text-[#12171D]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          You made it to the bottom of the page.
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[#12171D]/60">
          That means you&apos;re tired of guessing too. Might as well get the
          report while you&apos;re here.
        </p>
        <div className="mt-6">
          <CTAButton>Fine, show me the subreddits — $49</CTAButton>
        </div>
      </div>
    </div>
  );
}
