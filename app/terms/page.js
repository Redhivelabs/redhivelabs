import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions — RedHiveLabs",
  description: "The terms that govern your use of RedHiveLabs.",
};

export default function Terms() {
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
          <Link href="/features" className="hover:text-white">
            Features
          </Link>
          <Link href="/sample" className="hover:text-white">
            Sample
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
        </div>
      </nav>

      <div className="mx-auto mt-16 max-w-2xl">
        <h1
          className="text-3xl font-bold text-[#12171D] sm:text-4xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Terms and Conditions
        </h1>
        <p className="mt-2 text-sm text-[#12171D]/50">
          Last updated: August 2026
        </p>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-[#12171D]/80">
          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              1. Acceptance of terms
            </h2>
            <p className="mt-2">
              By using redhivelabs.com ("the Service"), you agree to these
              Terms and Conditions. If you do not agree, please do not use
              the Service.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              2. What the Service provides
            </h2>
            <p className="mt-2">
              RedHiveLabs provides a free keyword scan showing publicly
              available subreddit activity, and a paid placement report
              (currently $99 USD) containing curated subreddit
              recommendations, posting rules, removal-risk data, timing
              guidance, and supporting evidence, personally reviewed before
              delivery.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              3. Not affiliated with Reddit
            </h2>
            <p className="mt-2">
              RedHiveLabs is an independent service and is not affiliated
              with, endorsed by, or sponsored by Reddit, Inc. All data
              referenced is drawn from publicly available Reddit activity.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              4. Payment and refunds
            </h2>
            <p className="mt-2">
              Payment for the placement report is processed via PayPal at
              the time of order. Because report preparation begins promptly
              after payment, <strong>all sales are final and non-refundable
              once report delivery has begun.</strong> If you believe there
              has been an error with your order, contact us before your
              report is delivered.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              5. No guarantee of outcomes
            </h2>
            <p className="mt-2">
              The Service provides research and recommendations based on
              publicly available data at the time of your order. We do not
              guarantee specific results from posting on Reddit, including
              post approval, engagement, or business outcomes. Subreddit
              rules and moderation practices can change at any time and are
              outside our control.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              6. Acceptable use
            </h2>
            <p className="mt-2">
              You agree not to misuse the Service — including attempting to
              circumvent scan limits, scraping the Service, or using it for
              any unlawful purpose.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              7. Limitation of liability
            </h2>
            <p className="mt-2">
              The Service is provided "as is" without warranties of any
              kind. To the fullest extent permitted by law, RedHiveLabs
              will not be liable for any indirect, incidental, or
              consequential damages arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              8. Governing law
            </h2>
            <p className="mt-2">
              These Terms are governed by applicable law in the
              jurisdiction in which RedHiveLabs operates. This section will
              be updated with a specific jurisdiction once finalized.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              9. Changes to these terms
            </h2>
            <p className="mt-2">
              We may update these Terms from time to time. Continued use of
              the Service after changes are posted constitutes acceptance
              of the updated Terms.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              10. Contact
            </h2>
            <p className="mt-2">
              Questions about these Terms can be sent to us via our contact
              details on redhivelabs.com, or by reaching out on Twitter/X
              at{" "}
              <a
                href="https://twitter.com/Redhivelabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0B6E62] hover:underline"
              >
                @Redhivelabs
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
