import SiteNav from "../../components/SiteNav.js";

export const metadata = {
  title: "Terms and Conditions",
  description: "The terms that govern your use of Wolf of Reddit.",
};

export default function Terms() {
  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #15171A 0%, #0D0E10 55%, #08090B 100%)",
      }}
    >
      <SiteNav />

      <div className="mx-auto mt-16 max-w-2xl">
        <h1
          className="text-3xl font-bold text-white sm:text-4xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Terms and Conditions
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Last updated: August 2026
        </p>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-white/80">
          <section>
            <h2
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              1. Acceptance of terms
            </h2>
            <p className="mt-2">
              By using wolfofreddit.com ("the Service"), you agree to these
              Terms and Conditions. If you do not agree, please do not use
              the Service.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              2. What the Service provides
            </h2>
            <p className="mt-2">
              Wolf of Reddit provides a free keyword scan showing publicly
              available subreddit activity, and a paid placement report
              (currently $49 USD) containing curated subreddit
              recommendations, posting rules, removal-risk data, timing
              guidance, and supporting evidence, personally reviewed before
              delivery.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              3. Not affiliated with Reddit
            </h2>
            <p className="mt-2">
              Wolf of Reddit is an independent service and is not affiliated
              with, endorsed by, or sponsored by Reddit, Inc. All data
              referenced is drawn from publicly available Reddit activity.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-white"
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
              className="text-lg font-bold text-white"
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
              className="text-lg font-bold text-white"
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
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              7. Limitation of liability
            </h2>
            <p className="mt-2">
              The Service is provided "as is" without warranties of any
              kind. To the fullest extent permitted by law, Wolf of Reddit
              will not be liable for any indirect, incidental, or
              consequential damages arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              8. Governing law
            </h2>
            <p className="mt-2">
              These Terms are governed by the laws of India, without regard
              to its conflict of law principles. Any disputes arising from
              these Terms will be subject to the jurisdiction of Indian
              courts.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-white"
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
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              10. Contact
            </h2>
            <p className="mt-2">
              Questions about these Terms can be sent to us via our contact
              details on wolfofreddit.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
