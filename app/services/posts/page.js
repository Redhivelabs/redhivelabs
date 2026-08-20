import Link from "next/link";
import SiteNav from "../../../components/SiteNav.js";
import PackageCard from "../../../components/PackageCard.js";

export const metadata = {
  title: "Buy Reddit Posts — RedHiveLabs",
  description:
    "Real posts, through real aged accounts, in subreddits that won't remove them. $30 per post.",
};

const PACKAGES = [3, 6, 9, 12, 15];

export default function SubRedditPostsPage() {
  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
      }}
    >
      <SiteNav />

      {/* HERO */}
      <div className="mx-auto mt-20 max-w-2xl text-center">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B6E62]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Buy Reddit Posts
        </p>
        <h1
          className="mt-4 text-4xl font-extrabold leading-tight text-[#12171D] sm:text-5xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Your post, live — through accounts mods actually trust.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#12171D]/70">
          No throwaways, no bots. Real, aged, high-karma accounts post your
          content in subreddits that were never going to remove it.
        </p>
      </div>

      {/* PACKAGES */}
      <div className="mx-auto mt-16 max-w-5xl">
        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {PACKAGES.map(function (qty) {
            return (
              <PackageCard
                key={qty}
                qty={qty}
                unitPrice={30}
                unitLabel="posts"
                orderType="posts"
                featured={qty === 6}
              />
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-[#12171D]/40">
          $30 per post, every tier. No hidden fees. Pick a package, tell us
          your keyword on the next step.
        </p>
      </div>

      {/* WHAT'S INCLUDED */}
      <div className="mx-auto mt-24 max-w-2xl">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B6E62]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          What you get
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {[
            "Posted through real, aged, high-karma accounts — not throwaways that get flagged on sight",
            "We pick or confirm a subreddit with relaxed moderation for your keyword",
            "Written to fit the subreddit's tone, not a copy-pasted template",
            "You approve the content before it goes live",
          ].map(function (item) {
            return (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
                <span className="mt-0.5 text-[#0B6E62]">✓</span>
                <p className="text-sm leading-relaxed text-[#12171D]/75">{item}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-24 max-w-2xl text-center">
        <p
          className="text-2xl font-bold text-[#12171D]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Not sure which subreddit yet?
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[#12171D]/60">
          Get the Reddit Intel Report first — know exactly where to post
          before you spend a dollar on posting it.
        </p>
        <Link
          href="/reddit-intel-report"
          className="mt-6 inline-block rounded-full bg-[#0B6E62] px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_-12px_rgba(11,110,98,0.55)] transition-all hover:bg-[#0a5d53]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          See the Reddit Intel Report
        </Link>
      </div>
    </div>
  );
}
