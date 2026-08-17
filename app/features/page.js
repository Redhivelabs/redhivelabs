import Link from "next/link";
import NavAuthStatus from "../../components/NavAuthStatus.js";

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
          <Link href="/features" className="text-white">
            Features
          </Link>
          <Link href="/sample" className="hover:text-white">
            Sample
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
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
          that — before you hit submit.
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
            See where they're already talking
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            Type a keyword. We pull the top 5 subreddits actually discussing
            it — not the ones with the biggest subscriber count, the ones
            with real activity.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0B6E62]/10 px-3 py-1 text-xs font-medium text-[#0B6E62]">
            $69 USD report
          </div>
          <h2
            className="text-xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            The list mods don't want you to have
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            We go wider than the free scan — 10 to 15 real candidates — then
            cut the dead ones, the gated ones, and the ones that'll ghost
            your post. What's left is worth your time.
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
            Every subreddit has a removal rate. Some nuke 60% of posts on
            sight. We show you the number so you're not finding out the hard
            way, again.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <h2
            className="text-xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Rules, translated from mod-speak
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            "Self-promotion at moderator discretion" means whatever the mod
            on duty feels like that day. We flag which rules are actually
            enforced — and which ones nobody checks.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <h2
            className="text-xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Post when someone's actually awake
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            Not a generic "9am is best" guess. We pull the timestamps from
            the subreddit's own top posts and tell you when its people show
            up.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <h2
            className="text-xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Proof, not promises
          </h2>
          <p className="mt-2 text-sm text-[#12171D]/70">
            Real posts that actually worked in that exact subreddit — so
            you're not guessing what "good content" means to strangers on
            the internet.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-[#0B6E62]/20 bg-[#0B6E62]/5 p-8 text-center">
        <h2
          className="text-2xl font-bold text-[#12171D]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          A human looks at every report
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#12171D]/70">
          No bot spits out a list and calls it done. Every subreddit gets
          checked by a real person — dead ones, NSFW ones, and the ones that
          just don't fit get cut before you ever see them.
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
