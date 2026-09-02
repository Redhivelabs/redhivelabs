export default function AboutOriginStory() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Why This Exists
        </p>
        <h2
          className="mt-4 text-3xl font-bold leading-[1.15] text-white sm:text-4xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Reddit rewards relevance — and exposes shortcuts.
        </h2>
      </div>

      <div className="max-w-2xl">
        <p className="text-base leading-relaxed text-white/70">
          I started using Reddit as a marketing channel for affiliate projects, client campaigns, and my own ventures.
        </p>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          At first, I approached it the way many marketers do. Find a large subreddit, write something useful, add a link, and expect attention.
        </p>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          Reddit quickly showed me why that does not work.
        </p>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          A strong post in the wrong community still fails. A useful contribution from the wrong account can raise suspicion. A perfectly relevant idea can disappear because it ignored one rule, one cultural cue, or one moderator expectation.
        </p>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          Over time, I stopped asking, &ldquo;How do I promote this on Reddit?&rdquo;
        </p>
        <p
          className="mt-4 text-base font-bold text-white"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          I started asking better questions:
        </p>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          Where are buyers already discussing this problem? Which communities are open to the topic? What language do members use? What gets welcomed — and what gets removed?
        </p>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          Those questions became the foundation of Wolf of Reddit.
        </p>

        <blockquote
          className="mt-8 border-l-2 pl-5 text-lg italic leading-relaxed text-white/85"
          style={{ borderColor: "var(--color-accent)" }}
        >
          Reddit is not another distribution channel. It is thousands of communities, each with its own memory, language, and boundaries.
        </blockquote>
      </div>
    </div>
  );
}
