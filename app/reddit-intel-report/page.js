import Link from "next/link";

export const metadata = {
  title: "Reddit Intel Report — Know Before You Post | RedHiveLabs",
  description:
    "Stop guessing which subreddits will remove your post. Get exact removal rates, relaxed-moderation subreddits, and proven posting angles for your keyword — $49, delivered to your inbox.",
};

const NAV_LINK_CLASS = "hover:text-white";

function TopNav() {
  return (
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
        <Link href="/features" className={NAV_LINK_CLASS}>
          Features
        </Link>
        <Link href="/reddit-intel-report" className={NAV_LINK_CLASS}>
          Reddit Intel Report
        </Link>
        <Link href="/sample" className={NAV_LINK_CLASS}>
          Sample
        </Link>
        <Link href="/pricing" className={NAV_LINK_CLASS}>
          Pricing
        </Link>
      </div>
    </nav>
  );
}

function SectionLabel({ children }) {
  return (
    <p
      className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B6E62]"
      style={{ fontFamily: "var(--font-archivo), sans-serif" }}
    >
      {children}
    </p>
  );
}

function CTAButton({ children, href = "/dashboard?order=report" }) {
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
  {
    title: "You spend an hour writing the perfect post",
    body: "You research, you draft, you rewrite the title three times. You hit post. Four minutes later: removed. No explanation that makes sense — just gone.",
  },
  {
    title: "You get shadowbanned and never even know it",
    body: "Some subreddits don't remove your post outright — they just make sure nobody sees it. You post, you wait, you get zero traction, and you assume your content just wasn't good enough. It wasn't your content. It was the subreddit.",
  },
  {
    title: "You guess your way through 15 subreddits and burn your account",
    body: "Post after post, rejection after rejection, and now your account is flagged as spammy before you've even found a community that would've welcomed you.",
  },
];

const REPORT_CONTENTS = [
  {
    title: "Exact removal rates, before you post",
    body: "Every subreddit in your report comes with a real, measured removal rate — pulled from actual recent posts, not guesswork. Know which communities quietly kill posts like yours before you waste your shot.",
  },
  {
    title: "The relaxed-moderation subreddits, ranked",
    body: "We rank every candidate subreddit by an opportunity score that weighs activity, moderation strictness, and real audience relevance — so you know exactly where to start and where to hold back.",
  },
  {
    title: "Proof, not opinions",
    body: "Median score, top-10% score, average upvote ratio, dead-post rate — the same numbers a Reddit power-user would pull manually, done for you across every subreddit on your list.",
  },
  {
    title: "The exact rules that get posts removed",
    body: "Karma minimums, account-age requirements, self-promo restrictions, mandatory flair, link bans — flagged individually per subreddit, so you're never caught off guard by a rule you didn't know existed.",
  },
  {
    title: "When to post, not just where",
    body: "The specific days and hours each subreddit's top posts actually went up — so your post isn't competing against a graveyard feed.",
  },
  {
    title: "A ready-made angle for your exact keyword",
    body: "Not a generic template — a tailored suggestion for what kind of post or comment would actually land in that specific community, based on what's really being discussed there right now.",
  },
];

const FAQS = [
  {
    q: "What if I've never posted on Reddit before?",
    a: "That's exactly who this is for. The report tells you which communities are forgiving of newcomers and which ones will remove anything from a low-karma account on sight — so you're not learning that the hard way.",
  },
  {
    q: "Will this get my account banned?",
    a: "The report itself is pure research — reading it can't get you banned. It exists specifically to help you avoid the moderation mistakes that get accounts flagged or shadowbanned in the first place.",
  },
  {
    q: "How is this different from just searching Reddit myself?",
    a: "You could spend 4-6 hours manually checking removal patterns, reading rules, and guessing at posting times across a dozen subreddits. Or you can get it compiled, scored, and ranked in one document for $49.",
  },
  {
    q: "How fast do I get it?",
    a: "Every report is reviewed by a real person before delivery, so it isn't instant — but you'll get an email the moment it's ready, sent straight to your inbox.",
  },
  {
    q: "Is this a subscription?",
    a: "No. It's a single $49 payment for one report on one keyword. No recurring charges, no upsell you didn't ask for.",
  },
];

export default function RedditIntelReportPage() {
  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
      }}
    >
      <TopNav />

      {/* HERO */}
      <div className="mx-auto mt-20 max-w-3xl text-center">
        <SectionLabel>Reddit Intel Report</SectionLabel>
        <h1
          className="mt-4 text-4xl font-extrabold leading-tight text-[#12171D] sm:text-5xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Stop posting into subreddits that were always going to remove you.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#12171D]/70">
          Every subreddit has a moderation personality — some will bury your post in
          seconds, others will barely notice you're there. We find out which is which
          for your exact keyword, before you spend another hour writing a post that
          never had a chance.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <CTAButton>Get Your Reddit Intel Report — $49</CTAButton>
        </div>
        <p className="mt-3 text-xs text-[#12171D]/40">
          One-time payment. No subscription. Reviewed by a human before delivery.
        </p>
      </div>

      {/* PAIN */}
      <div className="mx-auto mt-28 max-w-4xl">
        <div className="text-center">
          <SectionLabel>The problem</SectionLabel>
          <h2
            className="mt-3 text-3xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Posting on Reddit without data is a coin flip you keep losing
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PAIN_POINTS.map(function (p) {
            return (
              <div
                key={p.title}
                className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]"
              >
                <h3
                  className="text-base font-bold text-[#12171D]"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#12171D]/65">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* REFRAME */}
      <div className="mx-auto mt-28 max-w-3xl text-center">
        <SectionLabel>The shift</SectionLabel>
        <h2
          className="mt-3 text-3xl font-bold text-[#12171D]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          What if you knew the removal rate before you hit post?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#12171D]/70">
          Somewhere in your niche, there are subreddits with active, engaged audiences
          and moderators who barely enforce anything. Your job isn&apos;t to write a
          better post — it&apos;s to find those subreddits first. That&apos;s the entire
          report.
        </p>
      </div>

      {/* WHAT'S INSIDE */}
      <div className="mx-auto mt-28 max-w-5xl">
        <div className="text-center">
          <SectionLabel>What's inside</SectionLabel>
          <h2
            className="mt-3 text-3xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Everything you'd research yourself, if you had six spare hours
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {REPORT_CONTENTS.map(function (item) {
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-[#12171D]/8 bg-white p-6"
              >
                <h3
                  className="text-base font-bold text-[#12171D]"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#12171D]/65">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="mx-auto mt-28 max-w-4xl">
        <div className="text-center">
          <SectionLabel>How it works</SectionLabel>
          <h2
            className="mt-3 text-3xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Three steps. No back-and-forth.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            {
              n: "1",
              t: "Tell us your keyword",
              d: "Whatever you're trying to promote, discuss, or get in front of people — your product, your niche, your topic.",
            },
            {
              n: "2",
              t: "We scan and score the real data",
              d: "We pull actual recent posts and moderation patterns across every relevant subreddit, then rank them by opportunity.",
            },
            {
              n: "3",
              t: "Your report lands in your inbox",
              d: "A reviewed, ranked, ready-to-use report — so your next post goes to a subreddit that was always going to let it through.",
            },
          ].map(function (step) {
            return (
              <div key={step.n} className="text-center sm:text-left">
                <span
                  className="text-3xl font-extrabold text-[#0B6E62]"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {step.n}
                </span>
                <h3
                  className="mt-2 text-base font-bold text-[#12171D]"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {step.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#12171D]/65">
                  {step.d}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* PRICING CTA BLOCK */}
      <div className="mx-auto mt-28 max-w-3xl">
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
            <Link
              href="/dashboard?order=report"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#0B6E62] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] transition-all hover:bg-white/90"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Get Your Report Now
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-28 max-w-2xl">
        <div className="text-center">
          <SectionLabel>Questions</SectionLabel>
          <h2
            className="mt-3 text-3xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Before you go
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

      {/* FINAL CTA */}
      <div className="mx-auto mt-28 max-w-2xl text-center">
        <h2
          className="text-2xl font-bold text-[#12171D]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Your next post can go to a subreddit that actually wants it there.
        </h2>
        <div className="mt-8">
          <CTAButton>Get Your Reddit Intel Report — $49</CTAButton>
        </div>
      </div>
    </div>
  );
}
