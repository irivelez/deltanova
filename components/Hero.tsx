"use client";

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

const ROTATING_LINES = [
  "Your customers see an instant upgrade.",
  "Your team works effortlessly.",
  "Your business compounds.",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] text-foreground">
          Existing businesses,
          <br />
          <span className="text-foreground/60">reborn AI-native.</span>
        </h1>

        <div className="mt-12 md:mt-16 text-2xl md:text-3xl font-medium text-foreground/90 min-h-[3rem] flex items-center">
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
            href="/apply"
            className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-medium border border-foreground/30 hover:border-foreground hover:bg-foreground/5 transition-colors"
          >
            Apply for the cohort →
          </Link>
          <p className="text-sm md:text-base text-foreground/50 font-mono">
            Building with the first 10 — 9 seats remaining.
          </p>
        </div>
      </div>
    </section>
  );
}
