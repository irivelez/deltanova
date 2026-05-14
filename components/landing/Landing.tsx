"use client";

/*
 * Deltanova landing — single-page magnet for design partners.
 *
 * Locked combination: paper · whisper · upgraded · clean
 *
 * Section flow (top → bottom):
 *   TopBar  →  Hero (tagline + headline + typewriter + CTA + social proof)
 *           →  Thesis (the quote, alone)
 *           →  How we work (3 numbered steps)
 *           →  Apply ("Walk us through last Tuesday" + 4-field form)
 *           →  Footer
 *
 * One client module so reveal animations + form state + typewriter share scope.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";

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
function TopBar({ onApply }: { onApply: () => void }) {
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
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              onApply();
            }}
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--orange-vis)" }}
          >
            Apply →
          </a>
        </nav>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  HERO
 * ═════════════════════════════════════════════════════════════════════ */
const ROTATING = [
  "Your customers feel an instant upgrade.",
  "Your team stops fighting the operation.",
  "Your business stops leaking time.",
];

function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative flex min-h-[calc(100vh-60px)] flex-col justify-center py-24 md:py-28" id="top">
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
          <div className="mt-12 flex items-center gap-3.5 text-[clamp(20px,2.2vw,28px)] font-medium leading-[1.25]" style={{ minHeight: "1.6em" }}>
            <span aria-hidden className="mono select-none" style={{ color: "var(--orange-vis)", fontSize: "0.7em" }}>
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
          <div className="mt-14 flex flex-wrap items-center gap-6">
            <button type="button" className="btn btn-primary" onClick={onApply}>
              Apply for access <span className="arrow">→</span>
            </button>
            <p className="mono m-0 text-[13px]" style={{ color: "var(--ink-faint)", letterSpacing: "0.02em" }}>
              Running with one design partner in field services.{" "}
              <span style={{ color: "var(--ink-dim)" }}>9 seats open.</span>
            </p>
          </div>
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
            — Deltanova thesis
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
    sub: "Three conversations, 90 to 120 minutes each. Customers, money, bottlenecks. Recorded and transcripted. Questions sharpen answers, answers sharpen the rebuild.",
  },
  {
    n: "02",
    line: "You open the systems.",
    sub: "Live data, current workflows, and the person who runs your stack.",
  },
  {
    n: "03",
    line: "We go build.",
    sub: "You answer questions as they come up, mostly async. The occasional call if the rebuild needs it. You don\u2019t sit in design meetings. You don\u2019t manage the project.",
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
 *  APPLY
 * ═════════════════════════════════════════════════════════════════════ */
const ANSWER_MIN = 200;
const ANSWER_MAX = 2000;

type Status = "idle" | "submitting" | "success" | "error";

function Apply({ applyRef }: { applyRef: React.RefObject<HTMLElement | null> }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const len = answer.length;
  const ok = len >= ANSWER_MIN && len <= ANSWER_MAX;
  const valid = name.trim() && email.trim() && link.trim() && ok;

  const counterClass = useMemo(() => {
    if (len === 0) return "counter idle";
    if (len < ANSWER_MIN) return "counter low";
    if (len > ANSWER_MAX) return "counter high";
    return "counter ok";
  }, [len]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid || status === "submitting") return;
    setErrorMsg(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          link: link.trim(),
          answer: answer.trim(),
          locale: "en",
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrorMsg(data?.error || "Submission rejected. Check the fields and retry.");
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
      <section id="apply" ref={applyRef} className="hairline py-24 md:py-32">
        <div className={containerStyle} style={{ maxWidth: 760 }}>
          <Reveal>
            <h2 className="h2">Received.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lede mt-6 max-w-[54ch]">
              We read every submission within 48 hours. You&rsquo;ll hear from us — either way.
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" ref={applyRef} className="hairline py-24 md:py-32">
      <div className={containerStyle}>
        <Reveal>
          <h2 className="h2 max-w-[22ch]">Walk us through last Tuesday.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="lede mt-6 max-w-[58ch]">
            Pick one part of the business that&rsquo;s leaking. Time, money, or your team&rsquo;s attention.
            Walk us through what actually happens, end to end. Where it starts. Where it slows down.
            What breaks when it does. Be Tuesday-concrete.
          </p>
        </Reveal>

        <form onSubmit={handleSubmit} noValidate className="mt-14 grid gap-9 max-w-[720px]">
          <Field idx="01" label="Name" htmlFor="f-name">
            <input
              id="f-name"
              type="text"
              className="input-line"
              placeholder="Your full name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          <Field idx="02" label="Email" htmlFor="f-email">
            <input
              id="f-email"
              type="email"
              className="input-line"
              placeholder="you@company.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field idx="03" label="Link" hint="website · linkedin · x" htmlFor="f-link">
            <input
              id="f-link"
              type="url"
              className="input-line"
              placeholder="https://"
              autoComplete="url"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Field>

          <Field idx="04" label="Walkthrough" htmlFor="f-answer">
            <p className="m-0 mb-3.5 text-[15.5px] leading-[1.55]" style={{ color: "var(--ink-dim)" }}>
              The texture matters more than the summary. Where it starts. Where it slows down. What breaks when it does.
            </p>
            <textarea
              id="f-answer"
              className="input-block"
              required
              minLength={ANSWER_MIN}
              maxLength={ANSWER_MAX}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Where it starts. Where it slows down. What breaks when it does."
            />
            <div className="mt-2.5 flex justify-between">
              <span className="counter idle">
                min {ANSWER_MIN} · max {ANSWER_MAX}
              </span>
              <span className={counterClass}>{len} chars</span>
            </div>
          </Field>

          {errorMsg && (
            <div
              role="alert"
              className="mono border p-3 text-[12px]"
              style={{ borderColor: "rgba(181, 75, 39, 0.4)", background: "rgba(181, 75, 39, 0.04)", color: "#b54b27" }}
            >
              ! {errorMsg}
            </div>
          )}

          <div className="mt-2 flex flex-wrap items-center justify-between gap-6">
            <button type="submit" className="btn btn-primary" disabled={!valid || status === "submitting"}>
              {status === "submitting" ? (
                "Submitting…"
              ) : (
                <>
                  Submit application <span className="arrow">→</span>
                </>
              )}
            </button>
            <p className="mono m-0 text-[12px]" style={{ color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
              9 of 10 seats remaining.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  idx,
  label,
  hint,
  htmlFor,
  children,
}: {
  idx: string;
  label: string;
  hint?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="field-label">
        <span>
          <span className="idx">{idx}</span>
          {label}
        </span>
        {hint && <span className="field-hint">{hint}</span>}
      </label>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  FOOTER
 * ═════════════════════════════════════════════════════════════════════ */
function Footer({ onApply }: { onApply: () => void }) {
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
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              onApply();
            }}
            className="hover:text-[var(--foreground)] transition-colors"
            style={{ color: "var(--ink-dim)" }}
          >
            Apply
          </a>
          <Link href="mailto:irina@deltanova.io" className="hover:text-[var(--foreground)] transition-colors" style={{ color: "var(--ink-dim)" }}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  LANDING — composer
 * ═════════════════════════════════════════════════════════════════════ */
export default function Landing() {
  const applyRef = useRef<HTMLElement | null>(null);

  const scrollToApply = useCallback(() => {
    const el = applyRef.current || document.getElementById("apply");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative">
      <TopBar onApply={scrollToApply} />
      <Hero onApply={scrollToApply} />
      <Thesis />
      <HowWeWork />
      <Apply applyRef={applyRef} />
      <Footer onApply={scrollToApply} />
    </div>
  );
}
