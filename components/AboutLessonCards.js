const LESSONS = [
  {
    n: "01",
    title: "Relevance beats reach.",
    text: "A smaller community with the right members can create more meaningful attention than a massive subreddit with little connection to your offer.",
  },
  {
    n: "02",
    title: "Context changes everything.",
    text: "The same idea can be welcomed in one community and removed in another. Rules matter, but unwritten expectations matter just as much.",
  },
  {
    n: "03",
    title: "Trust cannot be automated.",
    text: "Reddit users notice templated promotion immediately. Effective participation requires judgment, timing, and an understanding of the conversation already taking place.",
  },
];

export default function AboutLessonCards() {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {LESSONS.map(function (item, i) {
        return (
          <div
            key={item.n}
            className={
              "rounded-2xl border bg-[#15171A] p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-0.5 hover:border-[#FF6A1A]/30 " +
              (i === 0 ? "border-[#FF6A1A]/25" : "border-white/8")
            }
          >
            <span
              className="text-sm font-bold"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {item.n}
            </span>
            <h3
              className="mt-3 text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}
