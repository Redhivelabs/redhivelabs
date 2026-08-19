import Link from "next/link";
import ServicesNavDropdown from "../../../components/ServicesNavDropdown.js";
import PackageCard from "../../../components/PackageCard.js";

export const metadata = {
  title: "Sub Reddit Comments — RedHiveLabs",
  description:
    "Real comments on relevant threads, through real aged accounts. $15 per comment.",
};

const PACKAGES = [3, 6, 9, 12, 15];

export default function SubRedditCommentsPage() {
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
          <ServicesNavDropdown />
          <Link href="/reddit-intel-report" className="hover:text-white">
            Reddit Intel Report
          </Link>
          <Link href="/about" className="hover:text-white">
            About Me
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="mx-auto mt-20 max-w-2xl text-center">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B6E62]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Sub Reddit Comments
        </p>
        <h1
          className="mt-4 text-4xl font-extrabold leading-tight text-[#12171D] sm:text-5xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Sometimes a comment does more than a whole post.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#12171D]/70">
          Real, relevant comments dropped into threads that are already
          getting traction — through accounts with the karma to be believed.
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
                unitPrice={15}
                unitLabel="comments"
                orderType="comments"
                featured={qty === 6}
              />
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-[#12171D]/40">
          $15 per comment, every tier. No hidden fees. Pick a package, tell
          us your keyword on the next step.
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
            "Comments placed by real, aged, high-karma accounts on relevant, active threads",
            "We find or confirm threads where your comment actually fits the conversation",
            "Written to sound like a real person, not an ad",
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
          Not sure which threads yet?
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[#12171D]/60">
          Get the Reddit Intel Report first — know exactly where your
          audience already is before you spend a dollar commenting.
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
