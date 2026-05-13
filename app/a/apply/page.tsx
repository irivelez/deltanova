"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { SystemLine } from "@/components/design-a/SystemLine";
import { Prompt } from "@/components/design-a/Prompt";

const ANSWER_MIN = 200;
const ANSWER_MAX = 2000;

type Status = "idle" | "submitting" | "success" | "error";

export default function DesignAApplyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const answerLen = answer.length;
  const answerOk = answerLen >= ANSWER_MIN && answerLen <= ANSWER_MAX;

  const counterColor = useMemo(() => {
    if (answerLen === 0) return "text-foreground/35";
    if (answerLen < ANSWER_MIN) return "text-amber-300/70";
    if (answerLen > ANSWER_MAX) return "text-red-400/80";
    return "text-emerald-400/70";
  }, [answerLen]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
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
        const data = (await res.json().catch(() => null)) as
          | { error?: string; errors?: unknown }
          | null;
        const msg =
          data?.error || "Submission rejected. Check the fields and retry.";
        setErrorMsg(msg);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Retry in a moment.");
      setStatus("error");
    }
  }

  return (
    <main className="flex-1">
      <SystemLine />

      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex items-center justify-between">
            <Prompt>request access</Prompt>
            <Link
              href="/a"
              className="font-mono text-xs text-foreground/40 transition-colors hover:text-foreground"
            >
              ← back
            </Link>
          </div>

          <h1 className="mt-10 text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] text-foreground">
            Apply to build with us.
          </h1>

          <p className="mt-6 text-base md:text-lg text-foreground/55 leading-relaxed">
            Four fields. No call until we&rsquo;ve read what you sent.
          </p>

          {status === "success" ? (
            <Confirmation />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-8"
              noValidate
            >
              <Field label="Name" htmlFor="name" mono="01">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-foreground/20 bg-transparent py-2 text-base md:text-lg text-foreground outline-none transition-colors placeholder:text-foreground/25 focus:border-foreground"
                  placeholder="Your full name"
                />
              </Field>

              <Field label="Email" htmlFor="email" mono="02">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-foreground/20 bg-transparent py-2 text-base md:text-lg text-foreground outline-none transition-colors placeholder:text-foreground/25 focus:border-foreground"
                  placeholder="you@company.com"
                />
              </Field>

              <Field
                label="Link"
                htmlFor="link"
                mono="03"
                hint="website · linkedin · x"
              >
                <input
                  id="link"
                  name="link"
                  type="url"
                  required
                  autoComplete="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full border-b border-foreground/20 bg-transparent py-2 text-base md:text-lg text-foreground outline-none transition-colors placeholder:text-foreground/25 focus:border-foreground"
                  placeholder="https://"
                />
              </Field>

              <Field label="Filter question" htmlFor="answer" mono="04">
                <p className="mb-3 text-sm md:text-base text-foreground/65 leading-relaxed">
                  Describe one operational loop in your business — start to
                  finish — and tell us why your team hasn&rsquo;t already
                  automated it.
                </p>
                <textarea
                  id="answer"
                  name="answer"
                  required
                  minLength={ANSWER_MIN}
                  maxLength={ANSWER_MAX}
                  rows={10}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full resize-y border border-foreground/15 bg-foreground/[0.015] p-4 font-sans text-base text-foreground outline-none transition-colors placeholder:text-foreground/25 focus:border-foreground/60"
                  placeholder="Start with the trigger. Walk through every step. End with the bottleneck."
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] tracking-tight">
                  <span className="text-foreground/35">
                    min {ANSWER_MIN} · max {ANSWER_MAX}
                  </span>
                  <span className={counterColor}>{answerLen} chars</span>
                </div>
              </Field>

              {errorMsg && (
                <div
                  role="alert"
                  className="border border-red-400/30 bg-red-400/[0.04] p-3 font-mono text-xs text-red-300/90"
                >
                  ! {errorMsg}
                </div>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
                <button
                  type="submit"
                  disabled={
                    status === "submitting" ||
                    !name ||
                    !email ||
                    !link ||
                    !answerOk
                  }
                  className="inline-flex w-fit items-center justify-center border border-foreground/30 px-6 py-3 text-sm md:text-base font-medium transition-colors hover:border-foreground hover:bg-foreground/[0.04] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-foreground/30 disabled:hover:bg-transparent"
                >
                  {status === "submitting" ? "Submitting…" : "Submit →"}
                </button>
                <p className="font-mono text-xs text-foreground/40">
                  9 of 10 seats remaining.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  mono,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  mono: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45"
      >
        <span>
          <span className="text-emerald-400/60 mr-2 select-none">
            {mono}
          </span>
          {label}
        </span>
        {hint && (
          <span className="font-mono text-[10px] normal-case tracking-tight text-foreground/30">
            {hint}
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Confirmation() {
  return (
    <div className="mt-16 border border-foreground/15 bg-foreground/[0.015] p-8 md:p-10">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400/70">
        <span className="mr-2 select-none">$</span>
        received
      </div>
      <p className="mt-6 text-xl md:text-2xl font-medium leading-snug tracking-tight text-foreground">
        Your application landed.
      </p>
      <p className="mt-4 text-base md:text-lg text-foreground/65 leading-relaxed">
        We review every submission within 48 hours.
        <br />
        You&rsquo;ll hear from us — either way.
      </p>
      <div className="mt-10">
        <Link
          href="/a"
          className="inline-flex items-center font-mono text-xs text-foreground/45 transition-colors hover:text-foreground"
        >
          ← back to deltanova
        </Link>
      </div>
    </div>
  );
}
