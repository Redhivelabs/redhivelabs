import Link from "next/link";

export const metadata = {
  title: "Features — RedHiveLabs",
  description:
    "See exactly what you get with a RedHiveLabs Reddit placement report.",
};

export default function Features() {
  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
      }}
    >
      <nav className="mx-auto mt-6 flex max-w-4xl items-center justify-between gap-3 rounded-full bg-[#12171D] px-4 py-1.5 shadow-[0_8px_24px_-8px_rgba(18,23,29,0.4)] sm:px-6">
        <Link href="/">
          <img
            src="/lockup-horizontal-white.svg"
            alt="RedHiveLabs"
            className="w-auto flex-shrink-0"
            style={{ height: "40px" }}
          />
        </Link>
        <div className="flex items-center gap-3 text-xs font-medium text-white/70 sm:gap-6 sm:text-sm">
          <Link href="/features" className="text-white">
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

      <div className="mx-auto mt-16 max-w-3xl text-center">
        <h1
          className="text-4xl font-bold leading-tight tracking-tight text-[#12171D] sm:text-5xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          What You Get
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#12171D]/70">
          A free scan to get you started, and a curated report that tells you
          exactly where — and how — to post.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0B6E62]/10 px-3 py-1 text-xs font-medium text-[#0B6E62]">
            Free
          </div>
          <h2
            className="text-xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Instant keyword scan
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            Enter a keyword and see the top 5 subreddits where people are
            already talking about it — in seconds, no signup for your first
            scan.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0B6E62]/10 px-3 py-1 text-xs font-medium text-[#0B6E62]">
            $99 report
          </div>
          <h2
            className="text-xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            10-15 curated subreddits
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            Not just the top 5 — we go wider and hand-pick the strongest
            fits for your keyword, filtering out dead, gated, or irrelevant
            communities.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <h2
            className="text-xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Removal risk, upfront
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            See the real percentage of posts that get removed in each
            subreddit — before you post, not after.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <h2
            className="text-xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Posting rules, decoded
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            Every subreddit's rules, broken down and flagged by how strictly
            they're enforced — so you know what actually gets you banned.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <h2
            className="text-xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Best times to post
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            Based on when the highest-performing posts actually went live —
            not a generic guess.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <h2
            className="text-xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Real evidence, not guesses
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            Top-performing posts from each community, so you can see exactly
            what resonates before you write a word.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-[#0B6E62]/20 bg-[#0B6E62]/5 p-8 text-center">
        <h2
          className="text-2xl font-bold text-[#12171D]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Curated, not automated
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#12171D]/70">
          Every report is personally reviewed before it reaches you —
          irrelevant, dead, and NSFW subreddits get filtered out, so you're
          not left sorting through noise.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#0B6E62] px-8 py-3 font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53]"
        >
          Try a free scan
        </Link>
      </div>
    </div>
  );
}
