"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionLabel } from "./SectionLabel";

type Status = "idle" | "submitting" | "ok" | "error";

const MIN_ANSWER = 200;
const MAX_ANSWER = 2000;

/**
 * Design-B apply form. Institutional layout: left column = supporting copy,
 * right column = fields. The filter question carries one supporting line
 * explaining why we ask it. Success state replaces the form with the
 * confirmation copy from the spec.
 */
export function ApplyFormB() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [answer, setAnswer] = useState("");

  const answerLen = answer.trim().length;
  const answerValid = answerLen >= MIN_ANSWER && answerLen <= MAX_ANSWER;
  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    link.trim().length > 0 &&
    answerValid &&
    status !== "submitting";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          link: link.trim(),
          answer: answer.trim(),
          locale: "en",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus("error");
        setError(
          typeof body?.error === "string"
            ? body.error
            : "Submission failed. Please try again.",
        );
        return;
      }

      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Network error.");
    }
  }

  if (status === "ok") {
    return (
      <section className="px-6 md:px-12 lg:px-24 py-28 md:py-36">
        <div className="max-w-3xl">
          <SectionLabel index="✓">Application received</SectionLabel>
          <h1 className="mt-8 text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] text-foreground">
            Your application
            <br />
            <span className="text-foreground/55">landed.</span>
          </h1>
          <p className="mt-10 text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl">
            We review every submission within 48 hours. You&rsquo;ll hear from us — either way.
          </p>
          <div className="mt-12">
            <Link
              href="/b"
              className="font-mono text-sm text-foreground/55 hover:text-foreground transition-colors"
            >
              ← back to deltanova
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28">
      <div className="max-w-6xl grid md:grid-cols-[1fr_1.4fr] gap-14 md:gap-20">
        {/* Left column: supporting institutional copy */}
        <aside className="md:sticky md:top-24 self-start">
          <SectionLabel index="00">Apply</SectionLabel>
          <h1 className="mt-8 text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] text-foreground">
            Apply for access
            <span className="text-foreground/55">.</span>
          </h1>
          <p className="mt-8 text-base md:text-lg text-foreground/65 leading-relaxed">
            Four fields. The fourth is the one that matters.
          </p>
          <p className="mt-6 text-base md:text-lg text-foreground/65 leading-relaxed">
            We review every submission within 48 hours and respond either way.
          </p>
          <p className="mt-10 text-sm font-mono text-foreground/45">
            Building with the first 10. 9 seats remaining.
          </p>
        </aside>

        {/* Right column: the form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-10">
          <Field
            label="Name"
            id="name"
            required
            value={name}
            onChange={setName}
            placeholder="Your full name"
            autoComplete="name"
          />

          <Field
            label="Email"
            id="email"
            required
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@company.com"
            autoComplete="email"
          />

          <Field
            label="Link"
            id="link"
            required
            type="url"
            value={link}
            onChange={setLink}
            placeholder="Website, LinkedIn, or X profile"
            help="A public URL we can verify you with."
            autoComplete="url"
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="answer"
              className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/55"
            >
              Filter question <span className="text-emerald-400/70">*</span>
            </label>
            <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
              Describe one operational loop in your business — start to finish —
              and tell us why your team hasn&rsquo;t already automated it.
            </p>
            <p className="text-sm text-foreground/50 leading-relaxed">
              We ask this because the loops you haven&rsquo;t automated are the
              ones that reveal how your business actually works. {MIN_ANSWER}–{MAX_ANSWER} characters.
            </p>
            <textarea
              id="answer"
              required
              rows={10}
              minLength={MIN_ANSWER}
              maxLength={MAX_ANSWER}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="mt-3 w-full bg-transparent border border-foreground/20 focus:border-foreground/60 focus:outline-none transition-colors px-4 py-3 text-base text-foreground placeholder:text-foreground/30 leading-relaxed resize-y"
              placeholder="Start with the trigger. Walk us through every step, every handoff, every place a human currently has to decide. End with the bottleneck."
            />
            <div className="flex justify-between font-mono text-xs text-foreground/45">
              <span>
                {answerLen < MIN_ANSWER
                  ? `${MIN_ANSWER - answerLen} more chars to unlock submit`
                  : answerLen > MAX_ANSWER
                    ? `${answerLen - MAX_ANSWER} over limit`
                    : "ready"}
              </span>
              <span className="tabular-nums">
                {answerLen} / {MAX_ANSWER}
              </span>
            </div>
          </div>

          {error ? (
            <p className="font-mono text-sm text-red-400/80">{error}</p>
          ) : null}

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <button
              type="submit"
              disabled={!canSubmit}
              className="group inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-medium bg-foreground text-background disabled:bg-foreground/25 disabled:text-background/60 disabled:cursor-not-allowed hover:bg-foreground/90 transition-colors"
            >
              {status === "submitting" ? "Sending…" : "Apply"}
              <span className="ml-2 transition-transform group-enabled:group-hover:translate-x-0.5">
                →
              </span>
            </button>
            <Link
              href="/b"
              className="font-mono text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              ← back
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  help,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  help?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/55"
      >
        {label}{" "}
        {required ? <span className="text-emerald-400/70">*</span> : null}
      </label>
      {help ? (
        <p className="text-sm text-foreground/50 leading-relaxed">{help}</p>
      ) : null}
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/60 focus:outline-none transition-colors px-0 py-3 text-base md:text-lg text-foreground placeholder:text-foreground/30"
      />
    </div>
  );
}
