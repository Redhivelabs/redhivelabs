import SiteNav from "../../components/SiteNav.js";
import ServicePackagesGrid from "../../components/ServicePackagesGrid.js";
import SampleReportLink from "../../components/SampleReportLink.js";
import FaqAccordion from "../../components/FaqAccordion.js";

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
      "One seeded thread or high-context mention, plus three comments mentioning your brand by name — no links, placed in your single highest-opportunity community.",
    bullets: [
      "Target community chosen from live Wolf Score data",
      "3 comments mentioning your brand — no links, so they read natural instead of spammy",
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
      "Three coordinated placements across your top-ranked communities, plus 7 comments — 2 with links — the spread that starts showing up in search and AI answers.",
    bullets: [
      "3 communities mapped and prioritized by opportunity, not guesswork",
      "7 comments across your placements — 2 include links, the rest mention your brand by name",
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
    price: "$699",
    priceSuffix: "/mo",
    description:
      "5 Reddit posts and 10 comments every month — 4 with links — across the threads that keep ranking, so when someone asks Google or ChatGPT about your category, your name keeps surfacing.",
    bullets: [
      "5 posts + 10 comments every month across your target communities",
      "4 of the 10 comments include links, the rest mention your brand by name",
      "Continuous thread-finding — placements timed and risk-screened",
      "Monthly Reddit Visibility Report: where you're showing up in ranking threads and AI answers",
      "First priority on new high-opportunity threads as they surface",
    ],
    note: "Best for brands that want Reddit working for them every month, not once.",
    ctaLabel: "Make Me Unmissable → $699/mo",
  },
];

const FAQS = [
  {
    q: "Is posting on Reddit against the rules?",
    a: "No — but each subreddit has its own moderation style, and posting the wrong way in the wrong community can get you removed or banned. That's exactly what Wolf of Reddit is built to prevent: I analyze removal rates, moderation strictness, and self-promo restrictions before you ever post.",
  },
  {
    q: "What is the Opportunity Score?",
    a: "A 0–100 score calculated from a subreddit's removal risk, posting activity, Google visibility, and how often your keyword comes up in that community. Higher means a better opportunity to post and be seen.",
  },
  {
    q: 'What do "Post," "Warm Up First," and "Avoid" mean?',
    a: (
      <div className="flex flex-col gap-2">
        <p>
          <span className="font-bold" style={{ color: "var(--color-accent)" }}>
            Post
          </span>{" "}
          — low removal risk, no unusual restrictions. Safe to post now.
        </p>
        <p>
          <span className="font-bold" style={{ color: "var(--color-warn)" }}>
            Warm Up First
          </span>{" "}
          — moderate removal risk. Build some karma and post history before posting your key content.
        </p>
        <p>
          <span className="font-bold" style={{ color: "var(--color-danger)" }}>
            Avoid
          </span>{" "}
          — high removal risk combined with strict moderation. Don't post here without significant prep.
        </p>
      </div>
    ),
    // Plain-text version for FAQPage structured data, since `a` above is JSX.
    aText:
      "Post — low removal risk, no unusual restrictions. Safe to post now. Warm Up First — moderate removal risk. Build some karma and post history before posting your key content. Avoid — high removal risk combined with strict moderation. Don't post here without significant prep.",
  },
  {
    q: "Will my Reddit account get banned?",
    a: "I can't guarantee outcomes on a platform I don't control, but my whole approach is designed to reduce that risk — by identifying which subreddits are safe to post in directly versus which need warm-up, based on real removal-rate data rather than guesswork.",
  },
  {
    q: "Do you guarantee results (traffic, sales, engagement)?",
    a: "No — this report gives you data-backed placement intelligence, not guaranteed outcomes. What you post and how you engage still matters. I'm not affiliated with, endorsed by, or sponsored by Reddit, Inc.",
  },
  {
    q: "How current is the data in my report?",
    a: "Each report reflects live Reddit activity — subscriber counts, moderation status, and traction (median score, comments, upvote ratio, removal rate) — from the trailing 90 days, generated at the time you order.",
  },
  {
    q: "Can I get a report for a keyword/niche other than the one in the sample?",
    a: 'Yes — the sample report uses "skincare" as an example, but reports can be generated for any keyword or niche you\'re targeting.',
  },
  {
    q: "Do you post the content for me, or just tell me where to post?",
    a: "Both, depending on what you need. The report itself gives you the intelligence — exactly where to post, when, and how to approach each subreddit — so you can post it yourself. If you'd rather not handle posting directly, my placement packages put your content live through established, aged accounts chosen from the same risk-and-opportunity data in your report.",
  },
  {
    q: "What's your refund policy?",
    a: "Reports are non-refundable once delivered, since the data and analysis are generated specifically for your keyword at the time of purchase. For placement services, if a post gets removed, I'll replace it free of charge — in the same subreddit or an equivalent one — for up to 90 days from the original placement.",
  },
];

export default function Services() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(function (item) {
      return {
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.aText || item.a,
        },
      };
    }),
  };

  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #15171A 0%, #0D0E10 55%, #08090B 100%)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

      {/* SAMPLE REPORT */}
      <div className="mx-auto mt-12 max-w-2xl text-center">
        <SampleReportLink className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white hover:bg-white/5">
          See a Sample Report First
        </SampleReportLink>
      </div>

      {/* PACKAGES */}
      <ServicePackagesGrid packages={PACKAGES} />

      {/* FAQ */}
      <div id="faq" className="mx-auto mt-24 max-w-2xl scroll-mt-24">
        <div className="text-center">
          <h2
            className="text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            Questions, answered.
          </h2>
          <div className="mx-auto mt-5 h-px w-12 bg-white/15" />
        </div>

        <div className="mt-10">
          <FaqAccordion items={FAQS} defaultOpenIndex={0} />
        </div>
      </div>

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
            Find. Engage. Influence.
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
            community, no charge, no argument — for up to 90 days from the
            original placement.
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
