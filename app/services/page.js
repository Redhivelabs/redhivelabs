import Link from "next/link";
import NavAuthStatus from "../../components/NavAuthStatus.js";

export const metadata = {
  title: "Services — RedHiveLabs",
  description:
    "Reddit placement reports, posts, and comments — built on real, trusted accounts.",
};

export default function Services() {
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
          <Link href="/services" className="text-white">
            Services
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <NavAuthStatus />
        </div>
      </nav>

      <div className="mx-auto mt-16 max-w-3xl text-center">
        <h1
          className="text-4xl font-bold leading-tight tracking-tight text-[#12171D] sm:text-5xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Stop Getting Removed
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#12171D]/70">
          You post. A mod nukes it in 4 minutes. Nobody tells you why. We fix
          that — and we can do the posting for you, too.
        </p>
      </div>

      {/* REPORT SECTION */}
      <div className="mx-auto mt-16 max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0B6E62]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0B6E62]">
          Placement Report
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
            <h2
              className="text-xl font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              The list mods don't want you to have
            </h2>
            <p className="mt-2 text-sm text-[#12171D]/70">
              10-15 curated subreddits for your keyword — not the ones with
              the biggest subscriber count, the ones with real activity and
              real buyers.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
            <h2
              className="text-xl font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Know your odds before you post
            </h2>
            <p className="mt-2 text-sm text-[#12171D]/70">
              Removal rates, posting rules translated from mod-speak, best
              times to post, and real evidence — not guesses.
            </p>
          </div>
        </div>
      </div>

      {/* POSTS SECTION */}
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0B6E62]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0B6E62]">
          Sub Reddit Posts
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
            <h2
              className="text-xl font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              We post it. It stays up.
            </h2>
            <p className="mt-2 text-sm text-[#12171D]/70">
              Every post goes out through our own network of aged, high-karma
              accounts with real posting history — not throwaways that get
              shadowbanned before anyone sees them.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
            <h2
              className="text-xl font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Karma that mods actually trust
            </h2>
            <p className="mt-2 text-sm text-[#12171D]/70">
              A brand-new account triggers spam filters instantly. Ours don't
              — real history, real karma, real standing in the communities
              you need to reach.
            </p>
          </div>
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0B6E62]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0B6E62]">
          Sub Reddit Comments
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
            <h2
              className="text-xl font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Real conversations, not spam
            </h2>
            <p className="mt-2 text-sm text-[#12171D]/70">
              We comment where it actually fits the thread — mentions that
              read like a real person, not a bot dropping a link and
              vanishing.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
            <h2
              className="text-xl font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Built to last, not to get nuked
            </h2>
            <p className="mt-2 text-sm text-[#12171D]/70">
              The same trusted accounts that post for you leave comments too
              — established enough that mods don't think twice.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-[#0B6E62]/20 bg-[#0B6E62]/5 p-8 text-center">
        <h2
          className="text-2xl font-bold text-[#12171D]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          A human looks at every order
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#12171D]/70">
          No bot spits out a list and calls it done. Every report, post, and
          comment gets checked by a real person before it goes live.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#0B6E62] px-8 py-3 font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53]"
        >
          Run a free scan
        </Link>
      </div>
    </div>
  );
}
