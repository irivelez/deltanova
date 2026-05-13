"use client";

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { SystemLine } from "@/components/design-a/SystemLine";
import { Prompt } from "@/components/design-a/Prompt";

const ROTATING_LINES = [
  "Your customers see an instant upgrade.",
  "Your team works effortlessly.",
  "Your business compounds.",
];

export default function DesignAPage() {
  return (
    <main className="flex-1">
      <SystemLine />

      {/* HERO — single column, ~100vh, severe minimalism */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-2xl">
          <Prompt>deltanova · build log · 2026</Prompt>

          <h1 className="mt-10 text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.04] text-foreground">
            Existing businesses,
            <br />
            <span className="text-foreground/55">reborn AI-native.</span>
          </h1>

          <div className="mt-12 md:mt-14 text-xl md:text-2xl font-medium text-foreground/90 min-h-[3rem] flex items-baseline">
            <span className="font-mono text-emerald-400/60 mr-3 select-none">
              &gt;
            </span>
            <span className="font-sans">
              <Typewriter
                words={ROTATING_LINES}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={45}
                deleteSpeed={25}
                delaySpeed={2400}
              />
            </span>
          </div>

          <p className="mt-12 text-base md:text-lg text-foreground/55 leading-relaxed">
            Without the AI adoption project. Without your team, your clients,
            or your stakeholders noticing the change.
          </p>

          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/a/apply"
              className="inline-flex w-fit items-center justify-center border border-foreground/30 px-6 py-3 text-sm md:text-base font-medium transition-colors hover:border-foreground hover:bg-foreground/[0.04]"
            >
              Request access →
            </Link>
            <p className="font-mono text-xs md:text-sm text-foreground/45">
              Building with the first 10. 9 seats remaining.
            </p>
          </div>
        </div>
      </section>

      {/* MANIFESTO — single section, large quote, thin sign-off */}
      <section
        id="manifesto"
        className="px-6 md:px-10 lg:px-16 py-24 md:py-32 border-t border-foreground/10"
      >
        <div className="mx-auto w-full max-w-2xl">
          <Prompt>thesis</Prompt>
          <blockquote className="mt-10 text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.2] tracking-tight text-foreground">
            Make AI adoption transparent.
            <br />
            Customers don&rsquo;t realize they adopted AI.
            <br />
            <span className="text-foreground/55">
              They realize their business got better.
            </span>
          </blockquote>
          <div className="mt-10 font-mono text-xs tracking-tight text-foreground/45">
            — Deltanova thesis · May 2026
          </div>
        </div>
      </section>

      {/* SIGN-OFF — thin, terminal-style footer */}
      <footer className="px-6 md:px-10 lg:px-16 pb-12 pt-16 border-t border-foreground/10">
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-foreground/40">
          <div>deltanova/sas · co · 2026</div>
          <div className="flex gap-6">
            <Link
              href="/a/apply"
              className="transition-colors hover:text-foreground"
            >
              request access
            </Link>
            <a
              href="mailto:irina@deltanova.io"
              className="transition-colors hover:text-foreground"
            >
              contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
