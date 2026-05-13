"use client";

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { SectionLabel } from "./SectionLabel";

const ROTATING_LINES = [
  "Your customers see an instant upgrade.",
  "Your team works effortlessly.",
  "Your business compounds.",
];

/**
 * Design-B hero. Granola/Linear cadence: a small institutional label,
 * a confident headline, the live rotator with a blinking "_" cursor,
 * the closing line, then an institutional CTA + scarcity microcopy.
 */
export function HeroB() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-28">
      {/* Soft warmth — a single localized radial tint above the headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 20% 20%, rgba(255, 200, 140, 0.07), transparent 60%)",
        }}
      />

      <div className="max-w-5xl">
        <SectionLabel index="01">Design-partner cohort · 2026</SectionLabel>

        <h1 className="mt-8 text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.04] text-foreground">
          Existing businesses,
          <br />
          <span className="text-foreground/55">reborn AI-native.</span>
        </h1>

        <div className="mt-12 md:mt-14 text-2xl md:text-3xl font-medium text-foreground/90 min-h-[3rem] flex items-center">
          <span className="text-emerald-400/70 mr-3 select-none">▎</span>
          <span>
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

        <p className="mt-12 text-lg md:text-xl text-foreground/60 max-w-3xl leading-relaxed">
          Without the AI adoption project. Without your team, your clients, or
          your stakeholders noticing the change.
        </p>

        <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:gap-8 gap-4">
          <Link
            href="/b/apply"
            className="group inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Apply for access
            <span className="ml-2 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <p className="text-sm md:text-base text-foreground/55 font-mono">
            Building with the first 10. 9 seats remaining.
          </p>
        </div>
      </div>
    </section>
  );
}
