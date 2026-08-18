import Link from "next/link";
import NavAuthStatus from "../../components/NavAuthStatus.js";

export const metadata = {
  title: "About RedHiveLabs",
  description: "Why RedHiveLabs exists, and how we work.",
};

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
          <Link href="/services" className="hover:text-white">
            Services
          </Link>
          <Link href="/about" className="text-white">
            About
          </Link>
          <NavAuthStatus />
        </div>
      </nav>

      <div className="mx-auto mt-16 max-w-2xl">
        <h1
          className="text-4xl font-bold leading-tight tracking-tight text-[#12171D] sm:text-5xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          About RedHiveLabs
        </h1>

        <div className="mt-10 flex flex-col gap-8">
          <section>
            <h2
              className="text-xl font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              The problem I kept running into
            </h2>
            <p className="mt-3 text-[#12171D]/70">
              I've spent years working Reddit as a marketing channel — for
              affiliate campaigns, for client work, for my own ventures. It
              consistently outperforms paid ads for driving people who
              actually convert.
            </p>
            <p className="mt-3 text-[#12171D]/70">
              But Reddit doesn't forgive guesswork. Post in the wrong
              subreddit and you get buried. Post the right idea with the
              wrong account and a mod removes it in minutes. Get the timing
              wrong and nobody sees it at all. Every founder I talked to had
              the same story: good product, good content, zero traction —
              because nobody told them where to actually post it.
            </p>
            <p className="mt-3 text-[#12171D]/70">
              So I built the thing I wished existed: a tool that tells you
              exactly which subreddits are worth your time, what gets
              removed, and when to post — before you find out the hard way.
              That became RedHiveLabs.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Who's behind it
            </h2>
            <div className="mt-4 rounded-2xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
              <p
                className="font-bold text-[#12171D]"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Prakash Aravind
              </p>
              <p className="mt-1 text-sm text-[#0B6E62]">
                Founder, RedHiveLabs
              </p>
              <p className="mt-3 text-sm text-[#12171D]/70">
                Every report is reviewed personally before it reaches you.
                Every posting order goes out through accounts I know and
                trust. I stay hands-on because Reddit punishes anything that
                feels automated — the nuance is the whole product.
              </p>
            </div>
          </section>

          <section>
            <h2
              className="text-xl font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              What we actually do
            </h2>
            <ul className="mt-3 flex flex-col gap-2 text-[#12171D]/70">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-xs text-[#0B6E62]">
                  ✓
                </span>
                Scan real Reddit activity to find where your buyers are
                actually talking — not just the biggest subreddits.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-xs text-[#0B6E62]">
                  ✓
                </span>
                Check removal rates and posting rules before you ever hit
                submit.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0B6E62]/10 text-xs text-[#0B6E62]">
                  ✓
                </span>
                Post and comment through a network of real, aged, high-karma
                accounts when you want us to run it for you.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-xl font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              What we don't do
            </h2>
            <p className="mt-3 text-[#12171D]/70">
              No bots. No fake accounts. No vote manipulation. No
              carpet-bombing every subreddit that mentions your keyword.
              Reddit's communities spot inauthenticity fast — we don't take
              shortcuts that put your brand, or our accounts' standing, at
              risk.
            </p>
          </section>
        </div>

        <div className="mt-14 rounded-2xl border border-[#0B6E62]/20 bg-[#0B6E62]/5 p-8 text-center">
          <h2
            className="text-2xl font-bold text-[#12171D]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Want to see where you'd show up?
          </h2>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[#0B6E62] px-8 py-3 font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53]"
          >
            Run a free scan
          </Link>
        </div>
      </div>
    </div>
  );
}
