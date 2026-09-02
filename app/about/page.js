import Link from "next/link";
import SiteNav from "../../components/SiteNav.js";
import SampleReportLink from "../../components/SampleReportLink.js";
import AboutOriginStory from "../../components/AboutOriginStory.js";
import AboutLessonCards from "../../components/AboutLessonCards.js";
import AboutFounder from "../../components/AboutFounder.js";
import AboutMethodSteps from "../../components/AboutMethodSteps.js";
import AboutBoundaries from "../../components/AboutBoundaries.js";

export const metadata = {
  title: "About",
  description:
    "I learned Reddit by getting it wrong first. Here's why Wolf of Reddit exists, how I work, and where I draw the line.",
};

function Eyebrow({ children, center }) {
  return (
    <p
      className={
        "text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF6A1A] " +
        (center ? "text-center" : "")
      }
      style={{ fontFamily: "var(--font-archivo), sans-serif" }}
    >
      {children}
    </p>
  );
}

const PRIMARY_BUTTON =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6A1A] px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_-12px_rgba(255,106,26,0.45)] transition-all hover:bg-[#E85A0C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto";

const SECONDARY_BUTTON =
  "inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto";

export default function About() {
  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #15171A 0%, #0D0E10 55%, #08090B 100%)",
      }}
    >
      <SiteNav />

      {/* HERO */}
      <div className="relative mx-auto mt-20 max-w-2xl text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/4 rounded-full opacity-25 blur-3xl sm:h-[420px] sm:w-[420px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <Eyebrow center>About Wolf of Reddit</Eyebrow>
        <h1
          className="mx-auto mt-4 max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-6xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          I Learned Reddit by Getting It Wrong First.
        </h1>
        <p
          className="mx-auto mt-4 max-w-xl text-xl font-bold text-white/80"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Removed posts. Wasted weeks. Communities I completely misunderstood.
        </p>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/70">
          Those mistakes taught me something most Reddit marketing advice
          misses: success here is not about posting more. It is about
          understanding where you belong, how a community thinks, and what
          earns its attention.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-lg leading-relaxed text-white/70">
          That is the experience I turned into Wolf of Reddit.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className={PRIMARY_BUTTON} style={{ outlineColor: "var(--color-accent)" }}>
            See How It Works
          </Link>
          <SampleReportLink className={SECONDARY_BUTTON} style={{ outlineColor: "var(--color-accent)" }}>
            View Sample Report
          </SampleReportLink>
        </div>

        <div className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-wide text-white/40">
          <span>Research-led</span>
          <span className="hidden text-white/20 sm:inline">•</span>
          <span>Human-reviewed</span>
          <span className="hidden text-white/20 sm:inline">•</span>
          <span>Built around real community behavior</span>
        </div>
      </div>

      {/* ORIGIN STORY */}
      <div className="mx-auto mt-28 max-w-5xl">
        <AboutOriginStory />
      </div>

      {/* LESSONS */}
      <div className="mx-auto mt-28 max-w-5xl">
        <Eyebrow>What Reddit Taught Me</Eyebrow>
        <h2
          className="mt-3 max-w-xl text-2xl font-bold text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          The biggest subreddit is rarely the whole answer.
        </h2>
        <AboutLessonCards />
      </div>

      {/* FOUNDER */}
      <div className="mx-auto mt-28 max-w-5xl">
        <Eyebrow>Who&rsquo;s Behind It</Eyebrow>
        <AboutFounder />
      </div>

      {/* METHOD */}
      <div className="mx-auto mt-28 max-w-4xl text-center">
        <Eyebrow center>How I Work</Eyebrow>
        <h2
          className="mx-auto mt-3 max-w-lg text-2xl font-bold text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Research first. Judgment second. Execution last.
        </h2>
        <AboutMethodSteps />
      </div>

      {/* HONEST BOUNDARIES */}
      <div className="mx-auto mt-28 max-w-3xl">
        <div className="text-center">
          <Eyebrow center>The Honest Version</Eyebrow>
          <h2
            className="mt-3 text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            What I do — and where I draw the line.
          </h2>
        </div>
        <AboutBoundaries />
      </div>

      {/* CLOSING CTA */}
      <div className="mx-auto mt-28 max-w-2xl">
        <div
          className="relative overflow-hidden rounded-3xl border border-[#FF6A1A]/20 bg-[#15171A] p-7 text-center shadow-[0_24px_60px_-16px_rgba(0,0,0,0.5)] sm:p-10"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 0%, rgba(255,106,26,0.18) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <Eyebrow center>Start With Clarity</Eyebrow>
            <p
              className="mx-auto mt-3 max-w-md text-2xl font-extrabold text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Before you post on Reddit, know where you belong.
            </p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              Wolf of Reddit helps you identify the communities,
              conversations, and constraints that matter — before you spend
              weeks learning through trial and error.
            </p>
            <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/reddit-intel-report"
                className={PRIMARY_BUTTON}
                style={{ outlineColor: "var(--color-accent)" }}
              >
                Get Your Reddit Intel Report
              </Link>
              <SampleReportLink className={SECONDARY_BUTTON} style={{ outlineColor: "var(--color-accent)" }}>
                View Sample Report
              </SampleReportLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
