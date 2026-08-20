import Link from "next/link";
import NavAuthStatus from "../../components/NavAuthStatus.js";
import ServicesNavDropdown from "../../components/ServicesNavDropdown.js";

export const metadata = {
  title: "About RedHiveLabs",
  description:
    "I spent years learning Reddit the hard way so you don't have to. Here's why RedHiveLabs exists.",
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

export default function About() {
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
          <Link href="/about" className="text-white">
            About Me
          </Link>
          <NavAuthStatus />
        </div>
      </nav>

      {/* HERO */}
      <div className="mx-auto mt-20 max-w-2xl text-center">
        <Eyebrow>About Me</Eyebrow>
        <h1
          className="mt-4 text-4xl font-extrabold leading-tight text-[#12171D] sm:text-6xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          I learned Reddit the hard way.
        </h1>
        <p
          className="mx-auto mt-4 max-w-xl text-xl font-bold text-[#12171D]/80"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Removed posts, dead accounts, wasted weeks.
        </p>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#12171D]/70">
          So I built the thing I wish I&apos;d had on day one — and now it&apos;s
          yours for a lot less than the years it cost me.
        </p>
      </div>

      {/* STORY */}
      <div className="mx-auto mt-24 max-w-2xl">
        <Eyebrow>Why this exists</Eyebrow>
        <h2
          className="mt-3 text-2xl font-bold text-[#12171D] sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Reddit outperforms paid ads. It also punishes guesswork.
        </h2>

        <p className="mt-6 text-base leading-relaxed text-[#12171D]/70">
          I&apos;ve worked Reddit as a marketing channel for years — affiliate
          campaigns, client work, my own ventures. When it works, it beats paid
          ads for driving people who actually convert. That&apos;s the good news.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#12171D]/70">
          The bad news: Reddit doesn&apos;t forgive guesswork. Wrong subreddit,
          you get buried. Right idea, wrong account, a mod removes it in minutes.
          Wrong timing, nobody sees it at all. Every founder I talked to had the
          same story — good product, good content, zero traction, because nobody
          told them where to actually post.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#12171D]/70">
          So I built the thing I wished existed: something that tells you which
          subreddits are worth your time, what gets removed, and when to post —
          before you find out the hard way. That became RedHiveLabs.
        </p>
      </div>

      {/* WHO */}
      <div className="mx-auto mt-24 max-w-2xl">
        <Eyebrow>Who&apos;s behind it</Eyebrow>
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
          <p
            className="text-lg font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Prakash Aravind
          </p>
          <p className="mt-1 text-sm font-medium text-[#0B6E62]">
            Founder, RedHiveLabs
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#12171D]/70">
            One person, and that&apos;s on purpose. I review every report before
            it reaches you. Every posting order goes out through accounts I know
            and trust. I stay hands-on because Reddit punishes anything that
            feels automated — the nuance is the whole product, and you can&apos;t
            outsource it to a bot.
          </p>
        </div>
      </div>

      {/* WHAT I DO / DON'T */}
      <div className="mx-auto mt-24 max-w-3xl">
        <div className="text-center">
          <Eyebrow>The honest version</Eyebrow>
          <h2
            className="mt-3 text-2xl font-bold text-[#12171D] sm:text-3xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            What I do. And what I&apos;d never do.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#0B6E62]/15 bg-white p-6">
            <h3
              className="text-sm font-bold uppercase tracking-wide text-[#0B6E62]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              What I do
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Scan real Reddit activity to find where your buyers actually talk — not just the biggest subreddits.",
                "Check removal rates and posting rules before you ever hit submit.",
                "Post and comment through real, aged, high-karma accounts when you want it run for you.",
              ].map(function (item) {
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
              What I&apos;d never do
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Bots or fake accounts.",
                "Vote manipulation.",
                "Carpet-bomb every subreddit that mentions your keyword.",
                "Any shortcut that puts your brand — or my accounts' standing — at risk.",
              ].map(function (item) {
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

        <p className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-[#12171D]/60">
          Reddit&apos;s communities spot inauthenticity in seconds. I&apos;m not
          about to burn your reputation — or mine — for a shortcut.
        </p>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-24 max-w-2xl">
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
            className="text-2xl font-extrabold text-white"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Want to see where you&apos;d show up?
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/70">
            Run a free scan and get a feel for it. No account, no card, no catch.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#0B6E62] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] transition-all hover:bg-white/90"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Run a free scan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
