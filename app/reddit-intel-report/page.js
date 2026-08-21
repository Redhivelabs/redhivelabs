import Link from "next/link";
import SiteNav from "../../components/SiteNav.js";

export const metadata = {
  title: "Reddit Intel Report — Know Before You Post | RedHiveLabs",
  description:
    "Reddit is where your buyers do their real research — and most brands get removed before they're ever seen. Get the exact subreddits, rules, and timing for your keyword, before you post.",
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
  "You spent an hour on the post. Removed in four minutes. No reason given.",
  "Zero upvotes, zero comments, zero explanation. Shadowbanned, probably.",
  "Third rejected post this week — and now your account's flagged as spam.",
  "Or the quiet one nobody notices: you posted in a dead subreddit, and nobody was ever going to see it anyway.",
];

const IN_SCOPE = [
  "The removal reality — the real removal rate for every subreddit on your shortlist, so you know your actual odds before you post",
  "The rules that are actually enforced — karma minimums, account-age gates, self-promo limits, flair requirements (the ones that quietly kill posts)",
  "The timing that works — the specific days and hours top posts in each subreddit actually went live",
  "A ready-to-use angle — written for your exact keyword, not a swipe-file template",
  "The conversations already happening — real questions your buyers are asking right now, so you know precisely what to write",
];

const OUT_OF_SCOPE = [
  "A promise your post goes viral",
  "A done-for-you posting service (that's separate, if you want it)",
  "Reddit ads or paid promotion",
];

const FAQS = [
  {
    q: "Will this get my account banned?",
    a: "No. Reading a PDF has never banned anyone. This exists precisely so you don't get banned.",
  },
  {
    q: "I've never posted on Reddit. Is this for me?",
    a: "Especially you. It tells you which subreddits actually tolerate new, low-karma accounts — before you learn the hard way and torch your first one.",
  },
  {
    q: "We're a company, not a solo poster. Still relevant?",
    a: "More so. If you're evaluating Reddit as a channel, this is your due diligence: real removal risk, real audience size, real timing — before you commit a team's hours to it.",
  },
  {
    q: "How fast do I get it?",
    a: "Within 24-48 hours. A real person reviews every report before it goes out, so it's not instant — but you'll have it in your inbox within a day or two, often sooner.",
  },
  {
    q: "Is this a subscription?",
    a: "$49. Once. Nothing recurring, ever.",
  },
  {
    q: "Can I get one for a different keyword later?",
    a: "Order another anytime — same price, same process.",
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
      <div className="mx-auto mt-20 max-w-3xl text-center">
        <Eyebrow>Reddit Intel Report</Eyebrow>
        <h1
          className="mt-4 text-4xl font-extrabold leading-tight text-[#12171D] sm:text-5xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Reddit is where your buyers do their real research. Most brands get
          removed before they&apos;re ever seen.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#12171D]/70">
          Wrong subreddit, wrong moderator, wrong day — and your post is gone in
          minutes, with no reason given. This report tells you exactly where,
          when, and how to post for your niche{" "}
          <span className="font-semibold text-[#12171D]">before</span> you spend
          a dollar or burn an account.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <CTAButton>Show me the right subreddits — $49</CTAButton>
          <p className="max-w-sm text-xs text-[#12171D]/40">
            One keyword. One report. Every subreddit ranked by real removal
            rate, activity, and buyer intent.
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
          Reddit won&apos;t tell you the rules. It just enforces them — on you.
        </h2>

        <p className="mt-6 text-base leading-relaxed text-[#12171D]/70">
          Reddit drives some of the highest-intent traffic on the internet.
          People don&apos;t go there to be sold to; they go to ask{" "}
          <span className="italic">&quot;what actually works?&quot;</span> and{" "}
          <span className="italic">&quot;what should I buy?&quot;</span> — and
          they trust the answers more than any ad. That&apos;s exactly why
          it&apos;s worth getting right, and exactly why it punishes guesswork so
          hard:
        </p>

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
          Meanwhile, somewhere in your exact niche, there&apos;s a subreddit with
          a real, active audience and a moderator who barely lifts a finger. Your
          buyers are already in there, asking the exact questions your product
          answers.{" "}
          <span className="font-semibold text-[#12171D]">
            You just don&apos;t know which room it is.
          </span>{" "}
          That&apos;s the entire job of this report.
        </p>
      </div>

      {/* THE REFRAME */}
      <div className="mx-auto mt-24 max-w-2xl">
        <Eyebrow>Why this is worth $49 and not $0</Eyebrow>
        <h2
          className="mt-3 text-2xl font-bold text-[#12171D] sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          The problem was never your post. It was the room you posted it in.
        </h2>

        <p className="mt-6 text-base leading-relaxed text-[#12171D]/70">
          Every &quot;failed&quot; Reddit attempt gets blamed on the content.
          It&apos;s almost never the content. It&apos;s that Reddit is 100,000+
          separate rooms, each with its own rules, its own enforcement, its own
          culture, and its own best time to speak — and none of them are written
          down anywhere you can find.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#12171D]/70">
          Guess wrong and you don&apos;t just lose the post. You train the
          algorithm to distrust your account, so the{" "}
          <span className="italic">next</span> post starts in a hole too. Get it
          right — one time, in the right room — and Reddit becomes the cheapest
          high-intent channel you have.
        </p>
        <p className="mt-4 text-base font-semibold leading-relaxed text-[#12171D]">
          This report is the map. So the first move you make is the right one.
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
            Exactly what you get. And what you don&apos;t.
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

      {/* CREDIBILITY / RIGOR */}
      <div className="mx-auto mt-24 max-w-2xl">
        <Eyebrow>How we actually know this</Eyebrow>
        <h2
          className="mt-3 text-2xl font-bold text-[#12171D] sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Real data. Then a real human.
        </h2>

        <p className="mt-6 text-base leading-relaxed text-[#12171D]/70">
          Every report starts with live Reddit data — actual recent posts,
          actual removal patterns, actual activity and timing for your keyword,
          pulled and scored across every subreddit that matters for your niche.
          No recycled lists, no &quot;top 10 subreddits for marketing&quot; fluff
          you could&apos;ve Googled.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#12171D]/70">
          Then a person reviews it before it reaches you. That&apos;s why it
          isn&apos;t instant — and it&apos;s the whole point. You get analysis you
          can act on immediately, not a raw data dump you have to interpret.
        </p>
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
            { n: "1", t: "Give us your keyword — the product, service, or topic you want to talk about" },
            { n: "2", t: "We run the recon — real posts, real removal data, real timing, scored and ranked" },
            { n: "3", t: "Your report lands in your inbox — reviewed, ranked, and ready to act on" },
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
          Or keep posting blind: write it, cross your fingers, get removed, blame
          the algorithm, repeat next week. That works too, technically.
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
            One keyword. One report. One-time.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Less than an hour of your time. Roughly the cost of one removed post
            you&apos;ll never get back — except this one tells you where the{" "}
            <span className="italic">next</span> one lands.
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
          You made it to the bottom. That means you&apos;re tired of guessing too.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#12171D]/60">
          One keyword. One report. The exact rooms where your buyers are already
          waiting — and how to walk in without getting thrown out.
        </p>
        <div className="mt-6">
          <CTAButton>Show me the subreddits — $49</CTAButton>
        </div>
      </div>
    </div>
  );
}
