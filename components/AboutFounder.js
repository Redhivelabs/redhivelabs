export default function AboutFounder() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-2xl border border-white/8 bg-[#15171A] p-7 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] sm:p-8">
        <p
          className="text-lg font-bold text-white"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Prakash Aravind
        </p>
        <p className="mt-1 text-sm font-medium" style={{ color: "var(--color-accent)" }}>
          Founder, Wolf of Reddit
        </p>

        <p className="mt-5 text-sm leading-relaxed text-white/70">
          Wolf of Reddit is intentionally founder-led.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          I personally review the research and recommendations before a report reaches a client. When a project includes execution, I stay involved in the strategy, community selection, positioning, and quality control.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          That hands-on approach is not just a preference. It is necessary. Reddit decisions often depend on small details that automated tools overlook: the tone of recent discussions, how moderators interpret a rule, whether a community is tired of a topic, or whether a contribution genuinely belongs in the conversation.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Tools help me collect and organise the signals. Human judgment decides what they mean.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/8 pt-5 text-sm">
          <a
            href="https://t.me/wolfofreddit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 break-all text-white/60 hover:text-[#FF6A1A]"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="flex-shrink-0">
              <path d="M21.94 4.6c.28-1.13-.42-1.66-1.44-1.28L2.7 10.2c-1.1.44-1.08 1.06-.19 1.34l4.53 1.41 10.5-6.62c.5-.32.95-.14.58.2L9.9 14.35l-.35 4.94c.5 0 .72-.23.99-.5l2.38-2.3 4.94 3.63c.91.5 1.56.24 1.79-.85l3.29-14.7z" />
            </svg>
            @wolfofreddit
          </a>
          <a
            href="mailto:prakash@wolfofreddit.com"
            className="flex items-center gap-1.5 break-all text-white/60 hover:text-[#FF6A1A]"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 6 10-6" />
            </svg>
            prakash@wolfofreddit.com
          </a>
          <a
            href="https://twitter.com/WolfofReddits"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 break-all text-white/60 hover:text-[#FF6A1A]"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="flex-shrink-0">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @WolfofReddits
          </a>
        </div>
      </div>

      {/* Branded visual — no stock photo, reuses the existing badge mark over a
          restrained research-grid texture built from CSS, not a new asset. */}
      <div
        className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-white/8"
        style={{ backgroundColor: "#191B1F" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,106,26,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,26,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,106,26,0.12) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <img
          src="/brand/wolf-badge-icon.png"
          alt="Wolf of Reddit"
          className="relative h-32 w-32 sm:h-40 sm:w-40"
        />
      </div>
    </div>
  );
}
