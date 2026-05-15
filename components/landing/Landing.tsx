"use client";

/*
 * Deltanova landing — single-page magnet for design partners.
 *
 * Locked combination: paper · whisper · upgraded · clean
 *
 * Section flow (top → bottom):
 *   TopBar  →  Hero (tagline + headline + typewriter + lede + inline email form + social proof)
 *           →  Thesis (the quote, alone)
 *           →  How we work (3 numbered steps)
 *           →  Final CTA (Curious? + Start a conversation button)
 *           →  Footer
 *
 * One client module so reveal animations + form state + typewriter share scope.
 */

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { isWorkEmail } from "@/lib/apply-schema";

/* ─── Reveal — small fade + 8px rise on first viewport entry ──────────── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 0.9, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hand-rolled typewriter (orange ▎ cursor) ────────────────────────── */
function Typewriter({
  words,
  typeSpeed = 45,
  deleteSpeed = 25,
  holdMs = 2400,
}: {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdMs?: number;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < word.length) {
      t = setTimeout(() => setText(word.slice(0, text.length + 1)), typeSpeed);
    } else if (!deleting && text.length === word.length) {
      t = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(word.slice(0, text.length - 1)), deleteSpeed);
    } else {
      setDeleting(false);
      setI((p) => (p + 1) % words.length);
      return;
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, holdMs]);

  return (
    <span>
      {text}
      <span className="blink" aria-hidden />
    </span>
  );
}

/* ─── Layout primitives ───────────────────────────────────────────────── */
const containerStyle = "mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-20";

/* ═════════════════════════════════════════════════════════════════════
 *  TOP BAR
 * ═════════════════════════════════════════════════════════════════════ */
function TopBar({ onCta }: { onCta: () => void }) {
  return (
    <div
      className="sticky top-0 z-30 border-b border-[var(--ink-line)] backdrop-blur"
      style={{ background: "color-mix(in srgb, var(--background) 72%, transparent)" }}
    >
      <div className={containerStyle + " flex items-center justify-between py-4"}>
        <a href="#top" className="flex items-center">
          <span className="font-semibold tracking-tight text-[18px]" style={{ color: "var(--orange)" }}>
            deltanova
          </span>
        </a>
        <nav className="flex items-center gap-7">
          <a href="#thesis" className="hidden md:inline text-sm text-[var(--ink-dim)] hover:text-[var(--foreground)] transition-colors">
            Thesis
          </a>
          <a href="#how" className="hidden md:inline text-sm text-[var(--ink-dim)] hover:text-[var(--foreground)] transition-colors">
            How we work
          </a>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onCta();
            }}
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--orange-vis)" }}
          >
            Start a conversation →
          </a>
        </nav>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  HERO (with inline email capture + success swap)
 * ═════════════════════════════════════════════════════════════════════ */
const ROTATING = [
  "Your customers feel an instant upgrade.",
  "Your team stops fighting the operation.",
  "Your business stops leaking time.",
];

type Status = "idle" | "submitting" | "success" | "error";

function Hero({ emailInputRef }: { emailInputRef: React.RefObject<HTMLInputElement | null> }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const trimmed = email.trim();
    if (!trimmed) return;
    if (!isWorkEmail(trimmed)) {
      setErrorMsg("Please use a work email.");
      return;
    }

    setErrorMsg(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, locale: "en" }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrorMsg(data?.error || "Submission rejected. Check the field and retry.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Retry in a moment.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section
        className="relative flex min-h-[calc(100vh-60px)] flex-col justify-center py-24 md:py-28"
        id="top"
      >
        <div className={containerStyle}>
          <Reveal>
            <h1 className="h1 max-w-[18ch]">Thanks.</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lede mt-10 max-w-[44ch]">
              We&rsquo;ll be in touch at <strong>{email.trim()}</strong>.
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative flex min-h-[calc(100vh-60px)] flex-col justify-center py-24 md:py-28"
      id="top"
    >
      <div className={containerStyle}>
        <Reveal>
          <div className="eyebrow mb-7">
            AI-native operations, <span className="accent">delivered transparent</span>.
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="h1 max-w-[18ch]">
            <span className="muted-half">Your business,</span>
            <br />
            upgraded.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            className="mt-12 flex items-center gap-3.5 text-[clamp(20px,2.2vw,28px)] font-medium leading-[1.25]"
            style={{ minHeight: "1.6em" }}
          >
            <span
              aria-hidden
              className="mono select-none"
              style={{ color: "var(--orange-vis)", fontSize: "0.7em" }}
            >
              ▎
            </span>
            <span style={{ color: "var(--ink-strong)" }}>
              <Typewriter words={ROTATING} />
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="lede mt-10 max-w-[44ch]">
            Without the AI-adoption project. Without your team, your clients, or your stakeholders noticing the change.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-14 flex flex-wrap items-center gap-4 max-w-[560px]"
          >
            <input
              ref={emailInputRef}
              id="hero-email"
              aria-label="Work email"
              type="email"
              className="input-line flex-1 min-w-[260px]"
              placeholder="you@company.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              disabled={status === "submitting"}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!email.trim() || status === "submitting"}
            >
              {status === "submitting" ? (
                "Submitting…"
              ) : (
                <>
                  Start a conversation <span className="arrow">→</span>
                </>
              )}
            </button>
          </form>
        </Reveal>

        {errorMsg && (
          <div
            role="alert"
            className="mono mt-5 text-[12px]"
            style={{ color: "#b54b27", letterSpacing: "0.02em" }}
          >
            ! {errorMsg}
          </div>
        )}

        <Reveal delay={0.3}>
          <p
            className="mono mt-8 text-[13px]"
            style={{ color: "var(--ink-faint)", letterSpacing: "0.02em" }}
          >
            Running with one design partner in field services.{" "}
            <span style={{ color: "var(--ink-dim)" }}>9 seats open.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  THESIS
 * ═════════════════════════════════════════════════════════════════════ */
function Thesis() {
  return (
    <section id="thesis" className="hairline py-24 md:py-32">
      <div className={containerStyle}>
        <Reveal>
          <blockquote
            className="m-0 font-medium tracking-tight max-w-[22ch]"
            style={{
              fontSize: "clamp(28px, 4.6vw, 60px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            Make AI adoption transparent.
            <br />
            Customers don&rsquo;t realize they adopted AI.
            <br />
            <span className="muted-half">They realize their business got better.</span>
          </blockquote>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mono mt-10 text-[12px]" style={{ color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
            Deltanova thesis
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  HOW WE WORK
 * ═════════════════════════════════════════════════════════════════════ */
const STEPS = [
  {
    n: "01",
    line: "You walk us through the business.",
    sub: "Three deep conversations. We learn what’s leaking: customers, money, bottlenecks. You don’t prepare anything; the questions sharpen the answers.",
  },
  {
    n: "02",
    line: "We rebuild on top of your systems.",
    sub: "You open the data and workflows. We design and ship the agents that handle the draining work. Mostly async. No design meetings, no project to manage.",
  },
  {
    n: "03",
    line: "Your business runs itself.",
    sub: "Your team gets their time back. Your customers feel the upgrade. We tighten and extend the agents over time as you scale.",
  },
];

function HowWeWork() {
  return (
    <section id="how" className="hairline py-24 md:py-32">
      <div className={containerStyle}>
        <Reveal>
          <h2 className="h2 max-w-[22ch]">How we work.</h2>
        </Reveal>

        <div className="mt-14 max-w-[880px]">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.06 + i * 0.08}>
              <div className="stanza">
                <span className="n">{s.n}</span>
                <div className="copy">
                  {s.line}
                  <span className="sub">{s.sub}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  FINAL CTA
 * ═════════════════════════════════════════════════════════════════════ */
function FinalCTA({ onCta }: { onCta: () => void }) {
  return (
    <section className="hairline py-24 md:py-32">
      <div className={containerStyle}>
        <Reveal>
          <h2 className="h2 max-w-[22ch]">Curious?</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10">
            <button type="button" className="btn btn-primary" onClick={onCta}>
              Start a conversation <span className="arrow">→</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  FOOTER
 * ═════════════════════════════════════════════════════════════════════ */
function Footer({ onCta }: { onCta: () => void }) {
  return (
    <footer className="hairline py-12">
      <div className={containerStyle + " flex flex-wrap items-center justify-between gap-6"}>
        <div className="flex items-center gap-3" style={{ opacity: 0.85 }}>
          <span className="font-semibold tracking-tight text-[14px]" style={{ color: "var(--orange)" }}>
            deltanova
          </span>
          <span className="mono text-[12px]" style={{ color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
            © 2026
          </span>
        </div>
        <div className="mono flex gap-7 text-[12px]" style={{ color: "var(--ink-dim)" }}>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onCta();
            }}
            className="hover:text-[var(--foreground)] transition-colors"
            style={{ color: "var(--ink-dim)" }}
          >
            Start a conversation
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  LANDING — composer
 * ═════════════════════════════════════════════════════════════════════ */
export default function Landing() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const focusHeroEmail = useCallback(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative">
      <TopBar onCta={focusHeroEmail} />
      <Hero emailInputRef={emailInputRef} />
      <Thesis />
      <HowWeWork />
      <FinalCTA onCta={focusHeroEmail} />
      <Footer onCta={focusHeroEmail} />
    </div>
  );
}
