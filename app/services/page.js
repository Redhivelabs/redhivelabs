import SiteNav from "../../components/SiteNav.js";
import ServicePackagesGrid from "../../components/ServicePackagesGrid.js";

export const metadata = {
  title: "Services — Reddit Placement Packages",
  description:
    "SCOUT, PACK, and PRESENCE — done-for-you Reddit placements, chosen from live risk-and-opportunity data and placed through established, aged accounts.",
};

const PACKAGES = [
  {
    orderType: "scout",
    orderKeyword: "SCOUT — One Placement",
    name: "SCOUT — One Placement",
    price: "$129",
    description:
      "One seeded thread or high-context mention, placed in your single highest-opportunity community.",
    bullets: [
      "Target community chosen from live Wolf Score data",
      "Written and placed from established, aged accounts — you risk none of your own",
      "Pre-screened against that subreddit's real removal rate before anything goes live",
      "Native to the community's tone — reads like a member, not an ad",
    ],
    note: "Best for testing the waters in one specific niche.",
    ctaLabel: "Get Me In → $129",
  },
  {
    orderType: "pack",
    orderKeyword: "PACK — Three Placements",
    name: "PACK — Three Placements",
    featured: true,
    price: "$339",
    strikePrice: "$387",
    description:
      "Three coordinated placements across your top-ranked communities — the spread that starts showing up in search and AI answers.",
    bullets: [
      "3 communities mapped and prioritized by opportunity, not guesswork",
      "Staggered timing so it reads organic, never like a campaign",
      "Each placement risk-screened individually",
      "Covers the range of threads your buyers actually read before deciding",
    ],
    note: "Best for building real presence across a niche, not just one thread.",
    ctaLabel: "Own the Conversation → $339",
  },
  {
    orderType: "presence",
    orderKeyword: "PRESENCE — Monthly Visibility",
    name: "PRESENCE — Monthly Visibility",
    price: "$890",
    priceSuffix: "/mo",
    description:
      "Ongoing placement in the threads that keep ranking — so when someone asks Google or ChatGPT about your category, your name keeps surfacing.",
    bullets: [
      "Continuous thread-finding across your target communities",
      "Multiple placements per month, timed and risk-screened",
      "Monthly Reddit Visibility Report: where you're showing up in ranking threads and AI answers",
      "First priority on new high-opportunity threads as they surface",
    ],
    note: "Best for brands that want Reddit working for them every month, not once.",
    ctaLabel: "Make Me Unmissable → $890/mo",
  },
];

export default function Services() {
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
      <div className="mx-auto mt-16 max-w-2xl text-center">
        <h1
          className="mx-auto max-w-xl bg-transparent text-3xl font-extrabold leading-tight text-white sm:text-4xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Visibility on Reddit isn&apos;t random.
        </h1>

        <div className="mx-auto mt-5 h-px w-12 bg-white/15" />

        <p
          className="mx-auto mt-5 max-w-xl bg-transparent text-xl font-bold leading-snug text-white sm:text-2xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Your Reddit posts don&apos;t fail because they&apos;re bad.
          <br />
          <span
            className="bg-transparent"
            style={{ color: "var(--color-accent)", backgroundColor: "transparent", backgroundImage: "none" }}
          >
            They fail because no one ever sees them.
          </span>
        </p>

        <p className="mx-auto mt-6 max-w-[620px] text-left text-sm leading-relaxed text-white/55 sm:text-base">
          Post it wrong and a mod deletes it in twenty minutes — your karma,
          wasted. Post it right and it ranks on Google for years, gets quoted
          by ChatGPT, and sends you buyers on autopilot.
        </p>
        <p className="mx-auto mt-6 max-w-[620px] text-left text-base leading-relaxed text-white/75 sm:text-lg">
          I already know which rooms open the door and which ones slam it
          shut.
        </p>

        <div
          className="mx-auto mt-5 max-w-[620px] rounded-2xl px-6 py-6 text-center"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          <p
            className="text-lg font-extrabold leading-snug text-white sm:text-xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            NO VISIBILITY → YOU GET IGNORED
          </p>
          <p
            className="mt-2 text-lg font-extrabold leading-snug text-white sm:text-xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            IGNORED → YOUR COMPETITORS GET CHOSEN
          </p>
        </div>

        <div className="mx-auto mt-5 h-px w-16 bg-white/15" />

        <p className="mx-auto mt-5 max-w-[620px] text-center text-base italic text-white/70">
          This isn&apos;t about posting more. It&apos;s about showing up
          where it actually matters.
        </p>
        <p
          className="mt-8 text-xs font-bold uppercase tracking-[0.25em]"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Find. Engage. Influence.
        </p>
      </div>

      {/* PACKAGES */}
      <ServicePackagesGrid packages={PACKAGES} />

      {/* CLOSING SECTION */}
      <div className="mx-auto mt-24 max-w-2xl text-center">
        <h2
          className="text-2xl font-bold text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Start showing up where it matters.
        </h2>

        <div className="mx-auto mt-5 h-px w-12 bg-white/15" />

        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-[#FF6A1A]/30 bg-[#15171A] px-6 py-6 text-center">
          <p
            className="text-base leading-relaxed text-white sm:whitespace-nowrap sm:text-lg"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            If your brand isn&apos;t part of the conversations your buyers
            are reading,
          </p>
          <p
            className="mt-1 text-base font-bold leading-relaxed sm:text-lg"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-archivo), sans-serif" }}
          >
            you&apos;re already being left out of the decision.
          </p>
          <p
            className="mt-5 text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Find • Engage • Influence.
          </p>
        </div>
      </div>

      {/* GUARANTEE */}
      <div className="mx-auto mt-16 max-w-2xl">
        <div className="rounded-2xl border border-[#FF6A1A]/25 bg-[#1D2024] p-8 text-center shadow-[0_16px_40px_-16px_rgba(255,106,26,0.3)]">
          <div
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
            style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)" }}
          >
            🐺 The Wolf&apos;s Guarantee
          </div>
          <p
            className="text-lg font-bold text-white sm:text-xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            If a placement gets removed, I redo it free — in another
            community, no charge, no argument.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
            You&apos;re not betting on luck. You&apos;re betting on judgment
            that&apos;s already proven itself.
          </p>
        </div>
      </div>
    </div>
  );
}
