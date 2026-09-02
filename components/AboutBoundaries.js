const DO_ITEMS = [
  "Study real discussions to find where your buyers actually spend time.",
  "Review rules, content patterns, and potential removal risks before recommending a community.",
  "Build strategies around relevance, timing, positioning, and genuine participation.",
  "Personally review every client-facing report and recommendation.",
  "Set realistic expectations about what Reddit can and cannot deliver.",
];

const DONT_ITEMS = [
  "Use bots, scripted automation, or purchased fake engagement (fake upvotes, fake followers, and the like).",
  "Manipulate votes.",
  "Mass-post the same message across unrelated communities.",
  "Promise that moderators will approve a post.",
  "Guarantee virality, rankings, sales, or account safety.",
  "Risk a client's reputation for a temporary spike in traffic.",
];

export default function AboutBoundaries() {
  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#FF6A1A]/25 bg-[#15171A] p-6 sm:p-7">
          <h3
            className="text-sm font-bold uppercase tracking-wide text-[#FF6A1A]"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            What I Do
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {DO_ITEMS.map(function (item) {
              return (
                <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                  <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-accent)" }}>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#15171A] p-6 sm:p-7">
          <h3
            className="text-sm font-bold uppercase tracking-wide text-white/50"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            What I Will Not Do
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {DONT_ITEMS.map(function (item) {
              return (
                <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="mt-0.5 flex-shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-white/60">
        Reddit communities can detect inauthenticity quickly. Protecting your reputation matters more than forcing a short-term result.
      </p>
    </>
  );
}
