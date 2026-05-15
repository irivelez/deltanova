import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Deltanova collects, uses, shares, and protects personal information.",
  alternates: { canonical: "https://deltanova.io/privacy" },
  openGraph: {
    title: "Privacy Policy · Deltanova",
    description:
      "How Deltanova collects, uses, shares, and protects personal information.",
    url: "https://deltanova.io/privacy",
    siteName: "Deltanova",
    type: "article",
  },
};

const EFFECTIVE_DATE = "May 15, 2026";

const container = "mx-auto w-full max-w-[760px] px-6 md:px-10";
const sectionGap = "py-10 border-t border-[var(--ink-line)]";
const eyebrow =
  "eyebrow block mb-3";
const h2 =
  "text-[clamp(22px,2.2vw,28px)] font-medium tracking-tight text-[var(--foreground)] mb-5";
const bodyText =
  "text-[16px] leading-[1.65] text-[var(--ink-body)] [&_p+p]:mt-4 [&_p+ul]:mt-4 [&_ul+p]:mt-4";
const listStyle =
  "list-disc pl-6 space-y-2 marker:text-[var(--ink-faint)]";

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      {/* ─── Top bar (matches landing) ────────────────────────────── */}
      <div
        className="sticky top-0 z-30 border-b border-[var(--ink-line)] backdrop-blur"
        style={{
          background:
            "color-mix(in srgb, var(--background) 72%, transparent)",
        }}
      >
        <div
          className={
            "mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20 flex items-center justify-between py-4"
          }
        >
          <Link href="/" className="flex items-center">
            <span
              className="font-semibold tracking-tight text-[18px]"
              style={{ color: "var(--orange)" }}
            >
              deltanova
            </span>
          </Link>
          <Link
            href="/"
            className="mono text-[12px] hover:text-[var(--foreground)] transition-colors"
            style={{ color: "var(--ink-dim)", letterSpacing: "0.04em" }}
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* ─── Header ──────────────────────────────────────────────── */}
      <header className={container + " pt-16 pb-10"}>
        <span className="eyebrow">
          <span className="accent">§</span> Privacy Policy
        </span>
        <h1 className="h2 mt-4 mb-6">Privacy Policy</h1>
        <p className="mono text-[12px] muted-half mb-8">
          Effective {EFFECTIVE_DATE} · Last updated {EFFECTIVE_DATE}
        </p>
        <p className="lede">
          This Privacy Policy explains what personal information Deltanova
          collects, how we use it, who we share it with, and the choices
          and rights you have over your data. If anything is unclear,
          write to{" "}
          <a
            href="mailto:hello@deltanova.io"
            className="underline decoration-[var(--ink-line)] underline-offset-4 hover:text-[var(--foreground)]"
          >
            hello@deltanova.io
          </a>
          .
        </p>
      </header>

      <article className={container + " pb-24"}>
        {/* ─── 1. Who we are ──────────────────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>§ 01 · Who we are</span>
          <h2 className={h2}>Who we are</h2>
          <div className={bodyText}>
            <p>
              This Privacy Policy applies to{" "}
              <strong className="text-[var(--ink-strong)]">
                Deltanova S.A.S.
              </strong>
              , a Colombian sociedad por acciones simplificada with tax ID
              NIT 901.827.117-1 (&ldquo;Deltanova&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;), and to the websites,
              products, and services we provide at deltanova.io and its
              subdomains (the &ldquo;Service&rdquo;).
            </p>
            <p>
              Deltanova rebuilds existing businesses into AI-native
              operating models. To do that work, we collect a limited
              amount of personal information from the people who reach
              out to us, the people we have conversations with, and the
              businesses that grant us authorized access to their
              systems.
            </p>
          </div>
        </section>

        {/* ─── 2. Information we collect ──────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>§ 02 · Information we collect</span>
          <h2 className={h2}>Information we collect</h2>
          <div className={bodyText}>
            <p>
              <strong className="text-[var(--ink-strong)]">
                (a) Information you give us directly.
              </strong>{" "}
              When you submit a form on deltanova.io (including waitlist
              signups, applications for access, and contact requests),
              we collect the personal information you provide. This
              typically includes your name, work email, company, role,
              and any message you write to us.
            </p>
            <p>
              <strong className="text-[var(--ink-strong)]">
                (b) Information from conversations and discovery
                sessions.
              </strong>{" "}
              When you book or join a call with us through scheduling
              and video tools (for example, Google Calendar invites,
              Cal.com, Calendly, Google Meet, or Zoom), we collect the
              meeting metadata (your name, email, scheduled time,
              attendees) and the substantive content of the
              conversation. Calls may be recorded and transcribed using
              third-party AI transcription tools. We will obtain your
              consent before recording begins, and you may decline
              recording at any time without losing access to the
              conversation itself.
            </p>
            <p>
              <strong className="text-[var(--ink-strong)]">
                (c) Information from authorized access to your systems.
              </strong>{" "}
              If you become a design partner or customer and you grant
              us access to specific systems (for example, dispatching,
              CRM, scheduling, email, billing, or operational tooling),
              we access only what you authorize, only for the purposes
              you authorize, and only for the duration you authorize.
              The scope of access is documented in writing before
              access is granted. We do not extract data beyond the
              agreed scope.
            </p>
            <p>
              <strong className="text-[var(--ink-strong)]">
                (d) Website analytics.
              </strong>{" "}
              We use Vercel Analytics, a cookieless analytics product,
              to understand which pages people visit and how the site
              performs. This produces aggregate, non-identifying
              information about traffic. We do not use Google
              Analytics, Meta Pixel, LinkedIn Insight Tag, TikTok
              Pixel, or other cookie-based or fingerprint-based
              trackers on this site.
            </p>
            <p>
              <strong className="text-[var(--ink-strong)]">
                (e) Information automatically collected.
              </strong>{" "}
              Like most websites, our servers automatically receive
              technical information about your request (IP address,
              user agent string, referrer, timestamp). We use this
              information for security, debugging, and abuse
              prevention.
            </p>
          </div>
        </section>

        {/* ─── 3. How we use information ──────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>§ 03 · How we use information</span>
          <h2 className={h2}>How we use information</h2>
          <div className={bodyText}>
            <p>We use the information we collect to:</p>
            <ul className={listStyle}>
              <li>Provide, operate, and improve the Service.</li>
              <li>
                Respond to your inquiries and process applications for
                access.
              </li>
              <li>
                Conduct discovery conversations with prospective design
                partners.
              </li>
              <li>
                Analyze operations within authorized systems and
                produce the deliverables you have requested.
              </li>
              <li>
                Send transactional and operational communications (for
                example, reply to your inquiry, follow up after a
                conversation, send agreed-upon deliverables).
              </li>
              <li>
                Maintain security, prevent fraud and abuse, and enforce
                our terms.
              </li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p>
              We do not sell your personal information, and we do not
              share it for cross-context behavioral advertising.
            </p>
          </div>
        </section>

        {/* ─── 4. Artificial intelligence ─────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>§ 04 · Artificial intelligence</span>
          <h2 className={h2}>Artificial intelligence</h2>
          <div className={bodyText}>
            <p>
              Deltanova uses third-party large language model (LLM)
              providers, currently including{" "}
              <strong className="text-[var(--ink-strong)]">
                Anthropic
              </strong>{" "}
              and{" "}
              <strong className="text-[var(--ink-strong)]">OpenAI</strong>
              , to summarize, analyze, and structure information drawn
              from our work with you. This includes (a) transcripts and
              summaries of recorded conversations, (b) analyses of
              authorized data inside your systems, and (c) drafts of
              deliverables we produce for you.
            </p>
            <p>
              We choose providers and configurations that contractually
              prohibit using submitted content to train their
              foundation models. To the best of our knowledge, the
              inputs and outputs we send to these providers are not
              used to train models that benefit other customers.
            </p>
            <p>
              We apply the same standard to the AI transcription tools
              we use for recorded conversations: vendors are selected
              with a &ldquo;no training on call content&rdquo;
              requirement. The specific transcription vendor in use at
              any given time may vary; we will update this section as
              our vendor list changes.
            </p>
          </div>
        </section>

        {/* ─── 5. How we share information ────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>§ 05 · How we share information</span>
          <h2 className={h2}>How we share information</h2>
          <div className={bodyText}>
            <p>
              We share personal information only in the following
              circumstances:
            </p>
            <p>
              <strong className="text-[var(--ink-strong)]">
                (a) With subprocessors that operate our infrastructure.
              </strong>{" "}
              Each subprocessor processes data only under contract and
              only for the purposes we direct.
            </p>
            <div className="my-6 overflow-x-auto">
              <table className="w-full text-[14px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--ink-line)]">
                    <th className="text-left py-3 pr-6 font-medium text-[var(--ink-strong)]">
                      Subprocessor
                    </th>
                    <th className="text-left py-3 font-medium text-[var(--ink-strong)]">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-body)]">
                  <tr className="border-b border-[var(--ink-hair)]">
                    <td className="py-3 pr-6">Vercel Inc.</td>
                    <td className="py-3">
                      Website hosting and cookieless analytics
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--ink-hair)]">
                    <td className="py-3 pr-6">Supabase Inc.</td>
                    <td className="py-3">
                      Database and authentication
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--ink-hair)]">
                    <td className="py-3 pr-6">Zoho Corporation</td>
                    <td className="py-3">
                      Business email and communications
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--ink-hair)]">
                    <td className="py-3 pr-6">
                      Anthropic, PBC and OpenAI, OpCo, LLC
                    </td>
                    <td className="py-3">
                      AI / LLM processing (summarization, drafting,
                      analysis)
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--ink-hair)]">
                    <td className="py-3 pr-6">
                      Third-party AI transcription tools
                    </td>
                    <td className="py-3">
                      Recording and transcription of conversations
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">
                      Scheduling and video conferencing tools
                    </td>
                    <td className="py-3">
                      Meeting coordination and delivery
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong className="text-[var(--ink-strong)]">
                (b) With your authorization.
              </strong>{" "}
              If you instruct us to share your information with a third
              party (for example, a partner you want copied on a
              deliverable), we will follow your instruction.
            </p>
            <p>
              <strong className="text-[var(--ink-strong)]">
                (c) For legal reasons.
              </strong>{" "}
              We may share information when required by law, legal
              process, or to protect the rights, property, or safety of
              Deltanova, our customers, or others.
            </p>
            <p>
              <strong className="text-[var(--ink-strong)]">
                (d) In a corporate transaction.
              </strong>{" "}
              If Deltanova is involved in a merger, acquisition,
              financing due diligence, or sale of assets, information we
              hold may be transferred as part of that transaction.
              Successors are bound by this Privacy Policy or a
              substantially similar one.
            </p>
            <p>
              We do not sell or rent personal information, and we do not
              share it for cross-context behavioral advertising.
            </p>
          </div>
        </section>

        {/* ─── 6. How long we keep information ────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>
            § 06 · How long we keep information
          </span>
          <h2 className={h2}>How long we keep information</h2>
          <div className={bodyText}>
            <p>
              We retain personal information for as long as you maintain
              a relationship with us, or for as long as the information
              remains useful to the purpose for which we collected it,
              whichever is shorter.
            </p>
            <p>
              You may request deletion of your personal information at
              any time by writing to{" "}
              <a
                href="mailto:hello@deltanova.io"
                className="underline decoration-[var(--ink-line)] underline-offset-4 hover:text-[var(--foreground)]"
              >
                hello@deltanova.io
              </a>
              , and we will honor your request unless we are legally
              required to retain certain records (for example, tax
              records, audit trails, or fraud prevention).
            </p>
            <p>
              When you request deletion, we remove your information
              from our active systems within 30 days and from backups on
              the standard backup rotation cycle.
            </p>
          </div>
        </section>

        {/* ─── 7. Security ────────────────────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>§ 07 · Security</span>
          <h2 className={h2}>Security</h2>
          <div className={bodyText}>
            <p>
              We protect personal information with administrative,
              technical, and physical safeguards proportionate to the
              sensitivity of the information and the risks involved:
            </p>
            <ul className={listStyle}>
              <li>
                Encryption in transit (TLS) and at rest where supported
                by our subprocessors.
              </li>
              <li>
                Access controls limiting who at Deltanova can view
                personal data, on a need-to-know basis.
              </li>
              <li>
                Audit logging of administrative actions on our
                infrastructure.
              </li>
              <li>
                Vendor selection requirements for security posture (SOC
                2, ISO 27001, or equivalent where available).
              </li>
            </ul>
            <p>
              No security control is perfect. If we become aware of a
              personal data breach affecting your information, we will
              notify you and any applicable authorities in accordance
              with the law (within 72 hours of becoming aware, where
              required).
            </p>
          </div>
        </section>

        {/* ─── 8. International transfers ─────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>
            § 08 · International transfers
          </span>
          <h2 className={h2}>International transfers</h2>
          <div className={bodyText}>
            <p>
              Deltanova is based in Colombia. Some of our subprocessors
              (including Vercel, Supabase, Anthropic, and OpenAI) are
              based in the United States or process data in the United
              States. The United States is included in the list of
              countries with adequate protection under Circular Externa
              005 of 2017 issued by the Superintendencia de Industria y
              Comercio (SIC).
            </p>
            <p>
              By using the Service, you understand that your
              information may be transferred to and processed in
              jurisdictions outside Colombia, including the United
              States. For California and other U.S. residents, the
              converse also applies: your information may be processed
              in Colombia.
            </p>
          </div>
        </section>

        {/* ─── 9. Your privacy rights ─────────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>§ 09 · Your privacy rights</span>
          <h2 className={h2}>Your privacy rights</h2>
          <div className={bodyText}>
            <p>
              You have rights over the personal information we hold
              about you. The specific rights depend on where you are
              located.
            </p>
            <p>
              <strong className="text-[var(--ink-strong)]">
                Under Colombian Ley 1581 of 2012 (Habeas Data)
              </strong>
              , you have the right to:
            </p>
            <ul className={listStyle}>
              <li>
                Know what personal information we hold about you and
                obtain a copy.
              </li>
              <li>
                Update, correct, or rectify inaccurate or incomplete
                information.
              </li>
              <li>
                Request the deletion of your information when it is no
                longer needed or when processing violates the law.
              </li>
              <li>
                Withdraw consent to the processing of your information
                at any time.
              </li>
              <li>
                File a complaint with the Superintendencia de Industria
                y Comercio (SIC) if you believe your rights have been
                violated.
              </li>
            </ul>
            <p>
              <strong className="text-[var(--ink-strong)]">
                Under the California Consumer Privacy Act (CCPA / CPRA)
              </strong>
              , you have the right to:
            </p>
            <ul className={listStyle}>
              <li>
                Know what categories of personal information we
                collect, the sources, and the purposes.
              </li>
              <li>
                Access the specific pieces of personal information we
                hold about you.
              </li>
              <li>
                Delete personal information we hold about you, subject
                to legal exceptions.
              </li>
              <li>Correct inaccurate personal information.</li>
              <li>
                Opt out of the sale or sharing of personal information.
                We do not sell or share, but you may exercise this
                right as a matter of course.
              </li>
              <li>
                Non-discrimination for exercising any of these rights.
              </li>
            </ul>
            <p>
              <strong className="text-[var(--ink-strong)]">
                Other jurisdictions.
              </strong>{" "}
              If you reside elsewhere and applicable law grants you
              privacy rights similar to those above, you may exercise
              those rights with us.
            </p>
            <p>
              To exercise any of these rights, write to{" "}
              <a
                href="mailto:hello@deltanova.io"
                className="underline decoration-[var(--ink-line)] underline-offset-4 hover:text-[var(--foreground)]"
              >
                hello@deltanova.io
              </a>{" "}
              with the subject line &ldquo;Privacy request&rdquo;. We
              respond within 15 business days for Ley 1581 requests and
              within 45 days for CCPA requests, as required by the
              applicable law. We may verify your identity before
              fulfilling the request.
            </p>
            <p>
              You may authorize an agent to make a request on your
              behalf. We require written authorization and may verify
              the agent&rsquo;s identity and the underlying
              authorization.
            </p>
          </div>
        </section>

        {/* ─── 10. Cookies ────────────────────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>
            § 10 · Cookies and tracking technologies
          </span>
          <h2 className={h2}>
            Cookies and tracking technologies
          </h2>
          <div className={bodyText}>
            <p>
              The deltanova.io website uses{" "}
              <strong className="text-[var(--ink-strong)]">
                only Vercel Analytics
              </strong>
              , a cookieless analytics product. Vercel Analytics does
              not set cookies, does not use cross-site identifiers, and
              does not fingerprint your device. Aggregate,
              non-identifying information about page traffic is the
              only output.
            </p>
            <p>
              We do not use Google Analytics, Meta Pixel, LinkedIn
              Insight Tag, TikTok Pixel, or any other cookie-based or
              fingerprint-based tracking on this site. We do not need a
              cookie consent banner because we do not set non-essential
              cookies.
            </p>
            <p>
              If this changes, we will update this section and, where
              required by law, present a consent banner before any
              non-essential tracking technology is loaded.
            </p>
          </div>
        </section>

        {/* ─── 11. Children ───────────────────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>§ 11 · Children</span>
          <h2 className={h2}>Children</h2>
          <div className={bodyText}>
            <p>
              Deltanova is a business service for businesses. The
              Service is not directed to children, and we do not
              knowingly collect personal information from individuals
              under 18. If we learn that we have collected personal
              information from a child, we will delete it. If you
              believe a child has provided us personal information,
              please write to{" "}
              <a
                href="mailto:hello@deltanova.io"
                className="underline decoration-[var(--ink-line)] underline-offset-4 hover:text-[var(--foreground)]"
              >
                hello@deltanova.io
              </a>
              .
            </p>
          </div>
        </section>

        {/* ─── 12. Changes ────────────────────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>
            § 12 · Changes to this Privacy Policy
          </span>
          <h2 className={h2}>Changes to this Privacy Policy</h2>
          <div className={bodyText}>
            <p>
              We may update this Privacy Policy from time to time. When
              we do, we will revise the &ldquo;Last updated&rdquo; date
              at the top of this page. For material changes, we will
              provide additional notice (for example, by email to
              people we have a contact relationship with, or via a
              notice on the website) before the change takes effect.
            </p>
          </div>
        </section>

        {/* ─── 13. Contact ────────────────────────────────────────── */}
        <section className={sectionGap}>
          <span className={eyebrow}>§ 13 · Contact us</span>
          <h2 className={h2}>Contact us</h2>
          <div className={bodyText}>
            <p>
              To exercise a privacy right, ask a question about this
              policy, or report a concern about how we handle personal
              information, contact us at:
            </p>
            <p className="mono text-[14px] leading-[1.8] text-[var(--ink-strong)] mt-4">
              Deltanova S.A.S.
              <br />
              NIT 901.827.117-1
              <br />
              Colombia
              <br />
              <a
                href="mailto:hello@deltanova.io"
                className="underline decoration-[var(--ink-line)] underline-offset-4 hover:text-[var(--foreground)]"
              >
                hello@deltanova.io
              </a>
            </p>
            <p>
              For complaints, Colombian data subjects may also contact
              the Superintendencia de Industria y Comercio (SIC), the
              national data protection authority, at sic.gov.co.
            </p>
          </div>
        </section>
      </article>

      {/* ─── Footer (matches landing) ─────────────────────────────── */}
      <footer className="hairline py-12">
        <div
          className={
            "mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20 flex flex-wrap items-center justify-between gap-6"
          }
        >
          <div className="flex items-center gap-3" style={{ opacity: 0.85 }}>
            <span
              className="font-semibold tracking-tight text-[14px]"
              style={{ color: "var(--orange)" }}
            >
              deltanova
            </span>
            <span
              className="mono text-[12px]"
              style={{
                color: "var(--ink-faint)",
                letterSpacing: "0.04em",
              }}
            >
              © 2026
            </span>
          </div>
          <div
            className="mono flex gap-7 text-[12px]"
            style={{ color: "var(--ink-dim)" }}
          >
            <Link
              href="/"
              className="hover:text-[var(--foreground)] transition-colors"
              style={{ color: "var(--ink-dim)" }}
            >
              Home
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
