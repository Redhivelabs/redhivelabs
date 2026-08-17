import Link from "next/link";
import NavAuthStatus from "../../components/NavAuthStatus.js";

export const metadata = {
  title: "Pricing — RedHiveLabs",
  description: "One report, $69. No subscriptions, no hidden tiers.",
};

export default function Pricing() {
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
        <div
          className="flex items-center gap-2 text-[11px] font-medium text-white/70 sm:gap-6 sm:text-sm"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          <Link href="/features" className="hover:text-white">
            Features
          </Link>
          <Link href="/sample" className="hover:text-white">
            Sample
          </Link>
          <Link href="/pricing" className="text-white">
            Pricing
          </Link>
          <NavAuthStatus />
        </div>
      </nav>

      <div className="mx-auto mt-16 max-w-2xl text-center">
        <h1
          className="text-4xl font-bold leading-tight tracking-tight text-[#12171D] sm:text-5xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Simple, One-Time Pricing
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-[#12171D]/70">
          No subscriptions. No hidden tiers. Sign in to place an order.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-md">
        <div className="rounded-2xl border border-[#0B6E62]/20 bg-white p-8 text-center shadow-[0_12px_32px_-12px_rgba(18,23,29,0.2)]">
          <p className="text-sm font-medium uppercase tracking-wide text-[#0B6E62]">
            Placement Report
          </p>
          <p
            className="mt-3 text-5xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            $69 <span className="text-2xl font-medium text-[#12171D]/50">USD</span>
          </p>
          <p className="mt-1 text-sm text-[#12171D]/50">one-time</p>

          <ul className="mt-8 flex flex-col gap-4 text-left text-sm text-[#12171D]/80">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-xs text-[#0B6E62]">
                ✓
              </span>
              10-15 hand-curated subreddits for your keyword
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-xs text-[#0B6E62]">
                ✓
              </span>
              Removal risk for every community
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-xs text-[#0B6E62]">
                ✓
              </span>
              Posting rules, broken down and flagged
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-xs text-[#0B6E62]">
                ✓
              </span>
              Best times to post, backed by real data
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-xs text-[#0B6E62]">
                ✓
              </span>
              Real evidence — top-performing posts, not guesses
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-xs text-[#0B6E62]">
                ✓
              </span>
              Personally reviewed — no NSFW or dead subreddits
            </li>
          </ul>

          <Link
            href="/dashboard"
            className="mt-8 block rounded-full bg-[#0B6E62] px-8 py-3 font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53]"
          >
            Sign in to order
          </Link>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <p
            className="font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Also available
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#12171D]/70">
            <div className="flex items-center justify-between">
              <span>Subreddit posting (per post)</span>
              <span className="font-medium text-[#12171D]">$30</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Subreddit comments (per comment)</span>
              <span className="font-medium text-[#12171D]">$15</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-md text-center text-xs text-[#12171D]/40">
        Run a free scan first — sign in when you're ready to order.
      </p>
    </div>
  );
}
