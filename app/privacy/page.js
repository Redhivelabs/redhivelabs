import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — RedHiveLabs",
  description: "How RedHiveLabs collects, uses, and protects your information.",
};

export default function Privacy() {
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
          Privacy Policy
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
              1. Who we are
            </h2>
            <p className="mt-2">
              RedHiveLabs ("we", "us", "our") operates redhivelabs.com, a
              service that scans public Reddit activity for a keyword you
              provide and, for paid orders, delivers a curated placement
              report. This policy explains what information we collect and
              how we use it.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              2. Information we collect
            </h2>
            <p className="mt-2">We collect the following:</p>
            <ul className="mt-2 flex flex-col gap-2 pl-5">
              <li className="list-disc">
                <strong>Email address</strong> — collected when you sign up,
                used solely to send you a magic sign-in link and to
                communicate about your order.
              </li>
              <li className="list-disc">
                <strong>Keyword searches</strong> — the keywords you scan are
                stored so we can show you your past results and, for paid
                orders, generate your report.
              </li>
              <li className="list-disc">
                <strong>Payment information</strong> — processed entirely by
                PayPal. We never see or store your card or bank details;
                we only receive confirmation that a payment was completed.
              </li>
              <li className="list-disc">
                <strong>Cookies</strong> — a small cookie is set after your
                first free scan to limit repeat anonymous use of the free
                tier. It contains no personal information.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              3. How we use your information
            </h2>
            <p className="mt-2">
              We use your information to operate the service: to send
              sign-in links, to generate and deliver your report, to process
              payment, and to improve the accuracy of our scans. We do not
              sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              4. Third parties we use
            </h2>
            <ul className="mt-2 flex flex-col gap-2 pl-5">
              <li className="list-disc">
                <strong>PayPal</strong> — for payment processing.
              </li>
              <li className="list-disc">
                <strong>Resend</strong> — for sending sign-in and
                transactional emails.
              </li>
              <li className="list-disc">
                <strong>Third-party Reddit data providers</strong> — to
                retrieve public subreddit activity relevant to your keyword.
                No personal Reddit account information is accessed; only
                public post and subreddit data.
              </li>
              <li className="list-disc">
                <strong>Anthropic (Claude API)</strong> — used internally to
                help filter irrelevant subreddits during report curation.
                Only subreddit names, descriptions, and post titles are
                processed — never your personal information.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              5. Data retention
            </h2>
            <p className="mt-2">
              We retain your account and order information for as long as
              your account is active, or as needed to comply with legal and
              accounting obligations. You can request deletion of your
              account by contacting us.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              6. Your rights
            </h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of your
              personal information at any time by contacting us at the
              email address below.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              7. Changes to this policy
            </h2>
            <p className="mt-2">
              We may update this policy from time to time. Material changes
              will be reflected by updating the "last updated" date above.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-bold text-[#12171D]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              8. Contact
            </h2>
            <p className="mt-2">
              Questions about this policy can be sent to us via our
              contact details on redhivelabs.com, or by reaching out on
              Twitter/X at{" "}
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
