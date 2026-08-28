const STEPS = [
  {
    n: "01",
    title: "Find the right communities",
    text: "I identify where relevant conversations are already happening instead of chasing subreddit size alone.",
  },
  {
    n: "02",
    title: "Understand the environment",
    text: "I examine community rules, recent discussions, recurring language, content patterns, and potential removal risks.",
  },
  {
    n: "03",
    title: "Choose the right approach",
    text: "I turn that research into clear recommendations—or a carefully managed execution plan when the client wants hands-on support.",
  },
];

export default function AboutMethodSteps() {
  return (
    <div className="relative mt-14">
      {/* connecting pathway — vertical on mobile, horizontal on desktop */}
      <div
        className="absolute left-5 top-2 bottom-2 w-px md:bottom-auto md:left-0 md:right-0 md:top-5 md:h-px md:w-auto"
        style={{ backgroundColor: "rgba(255,106,26,0.25)" }}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-10 md:flex-row md:gap-8">
        {STEPS.map(function (step) {
          return (
            <div key={step.n} className="relative flex gap-4 md:flex-1 md:flex-col md:items-center md:gap-0 md:text-center">
              <span
                className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  backgroundColor: "#0D0E10",
                  border: "1px solid var(--color-accent)",
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-archivo), sans-serif",
                }}
              >
                {step.n}
              </span>
              <div className="md:mt-5">
                <h3
                  className="text-base font-bold text-white"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-white/65">
                  {step.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
