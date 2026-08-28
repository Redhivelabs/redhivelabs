import SiteNav from "../../components/SiteNav.js";
import ReportCheckoutCard from "../../components/ReportCheckoutCard.js";
import ScrollToButton from "../../components/ScrollToButton.js";
import SampleReportLink from "../../components/SampleReportLink.js";

export const metadata = {
  title: "Reddit Intel Report — Know Before You Post",
  description:
    "Your Buyers are on Reddit. Your Posts Keep Getting Removed. We tell you where to post, when, and how — before you hit submit.",
};

function Eyebrow({ children }) {
  return (
    <p
      className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF6A1A]"
      style={{ fontFamily: "var(--font-archivo), sans-serif" }}
    >
      {children}
    </p>
  );
}

function CTAButton({ children }) {
  return (
    <ScrollToButton
      targetId="get-report"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6A1A] px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_-12px_rgba(255,106,26,0.45)] transition-all hover:bg-[#E85A0C]"
      style={{ fontFamily: "var(--font-archivo), sans-serif" }}
    >
      {children}
    </ScrollToButton>
  );
}

const HERO_CHECKS = [
  "The subreddits that won't remove you",
  "The exact days and hours to post",
  "What your buyers are already asking",
];

const PAIN_POINTS = [
  "Spent an hour on the post. Gone in four minutes.",
  "Zero upvotes, zero comments, zero explanation. Shadowbanned, probably.",
  "Third removal this week. Now your account's flagged as spam.",
  "Or worse — it stayed up in a dead subreddit nobody reads.",
];

const IN_SCOPE = [
  "Real removal rate for every subreddit on your list",
  "The rules that actually get enforced — karma, account age, self-promo, flair",
  "The days and hours that actually work",
  "An angle written for your keyword, not a template",
  "The exact questions your buyers are asking right now",
];

const OUT_OF_SCOPE = [
  "A promise you go viral",
  "Us posting for you (that's a different service)",
  "Reddit ads",
];

const FAQS = [
  {
    q: "Will this get my account banned?",
    a: "No. Reading a PDF has never banned anyone. This is how you avoid it.",
  },
  {
    q: "Never posted on Reddit. Still for me?",
    a: "Especially you. It shows you which subreddits go easy on new accounts — before you torch your first one.",
  },
  {
    q: "We're a company, not one guy with a Reddit account.",
    a: "Even better. This is your due diligence before you put a team's hours into a channel.",
  },
  {
    q: "How fast?",
    a: "24-48 hours. A real person checks every report before it goes out.",
  },
  {
    q: "Subscription?",
    a: "No. $49. Once. That's the whole thing.",
  },
  {
    q: "Another keyword later?",
    a: "Order another. Same price, same deal.",
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
          "radial-gradient(ellipse at top, #15171A 0%, #0D0E10 55%, #08090B 100%)",
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
          className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Your Buyers are on Reddit. Your Posts Keep Getting Removed.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/70">
          Wrong Subreddit, Wrong Time — Gone in Minutes. We tell you the right ones.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <CTAButton>Show me the Right Subreddits — $49*</CTAButton>
        </div>

        <div className="mx-auto mt-8 flex max-w-sm flex-col gap-2 text-left sm:mx-auto sm:inline-flex sm:items-start">
          {HERO_CHECKS.map(function (item) {
            return (
              <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6A1A]/15 text-[10px] font-bold text-[#FF6A1A]">
                  ✓
                </span>
                {item}
              </div>
            );
          })}
        </div>
      </div>

      {/* PAIN */}
      <div className="mx-auto mt-24 max-w-2xl">
        <Eyebrow>You already know this part</Eyebrow>
        <h2
          className="mt-3 text-2xl font-bold text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Reddit won&apos;t tell you the rules. It just enforces them. On you.
        </h2>

        <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/40">
          Your last few attempts, probably:
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {PAIN_POINTS.map(function (p) {
            return (
              <div
                key={p}
                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-[#15171A] p-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
              >
                <span className="mt-0.5 text-[#E2564C]">✕</span>
                <p className="text-sm leading-relaxed text-white/75">{p}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-base leading-relaxed text-white/70">
          Somewhere in your niche there&apos;s a subreddit full of your buyers,
          run by a mod who barely shows up. You just don&apos;t know which one.
        </p>
        <p
          className="mt-2 text-base font-bold text-white"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          That&apos;s the whole report.
        </p>
      </div>

      {/* THE REFRAME */}
      <div className="mx-auto mt-24 max-w-2xl">
        <Eyebrow>Why this, and not a free Google search</Eyebrow>
        <h2
          className="mt-3 text-2xl font-bold text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          It was never your post. It was the room.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          Reddit is 100,000+ rooms. Each with its own rules, nobody wrote down.
          Guess wrong and you don&apos;t just lose the post — you teach the
          algorithm to bury the next one too.
        </p>
        <p
          className="mt-2 text-base font-bold text-white"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Get it right once, and Reddit&apos;s the cheapest buyers you&apos;ll ever
          find.
        </p>
      </div>

      {/* WHAT'S IN / WHAT'S NOT */}
      <div className="mx-auto mt-24 max-w-3xl">
        <div className="text-center">
          <Eyebrow>The honest version</Eyebrow>
          <h2
            className="mt-3 text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            What you get. What you don&apos;t.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#FF6A1A]/20 bg-[#15171A] p-6">
            <h3
              className="text-sm font-bold uppercase tracking-wide text-[#FF6A1A]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              In the report
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {IN_SCOPE.map(function (item) {
                return (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                    <span className="mt-0.5 text-[#FF6A1A]">✓</span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#15171A] p-6">
            <h3
              className="text-sm font-bold uppercase tracking-wide text-white/50"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Not in it
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {OUT_OF_SCOPE.map(function (item) {
                return (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/50">
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
            className="mt-3 text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Three steps. Done.
          </h2>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            { n: "1", t: "Give us your keyword." },
            { n: "2", t: "We run the recon — real posts, real removal data, real timing." },
            { n: "3", t: "Report hits your inbox. Go post." },
          ].map(function (step) {
            return (
              <div key={step.n} className="text-center">
                <span
                  className="text-3xl font-extrabold text-[#FF6A1A]"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {step.n}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {step.t}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <SampleReportLink className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white hover:bg-white/5">
            See It In Action — Download a Sample Report
          </SampleReportLink>
        </div>
      </div>

      {/* THE ALTERNATIVE */}
      <div className="mx-auto mt-24 max-w-2xl text-center">
        <p className="text-base leading-relaxed text-white/60">
          Or keep guessing. Write it, cross your fingers, get removed, blame the
          algorithm, repeat. That works too. Technically.
        </p>
      </div>

      {/* PRICING CTA BLOCK */}
      <div id="get-report" className="mx-auto mt-16 max-w-2xl scroll-mt-24">
        <div className="rounded-3xl border border-white/8 bg-[#15171A] p-10 text-center shadow-[0_24px_60px_-16px_rgba(0,0,0,0.5)]">
          <p
            className="text-xs font-bold uppercase tracking-[0.14em] text-white/50"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Reddit Intel Report
          </p>
          <p
            className="mt-3 text-5xl font-extrabold"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-archivo), sans-serif" }}
          >
            $49
          </p>
          <p className="mt-2 text-sm text-white/60">
            One keyword. One report. Once. No subscription, no upsell.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
            Cheaper than the hour you&apos;ll waste on a post that gets removed
            anyway.
          </p>
          <ReportCheckoutCard />
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-24 max-w-xl">
        <div className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            className="mt-3 text-2xl font-bold text-white sm:text-3xl"
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
                  className="text-sm font-bold text-white"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {item.q}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">
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
          className="text-xl font-bold text-white"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          You scrolled all the way down here.
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
          So you&apos;re clearly tired of guessing. Get the report. Post in the
          right room for once.
        </p>
        <div className="mt-6">
          <CTAButton>Fine, show me the subreddits — $49</CTAButton>
        </div>
      </div>
    </div>
  );
}
