import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const BULLETS = [
  "You already know your business needs to be rebuilt around AI — we are not here to convince you.",
  "You are willing to open the operation: live data, the messy processes, the calls your team is on this week.",
  "You can explain your entire business — customers, money, bottlenecks — in two 90-minute conversations.",
  "You own the company, you run it day-to-day, and demand is currently outpacing what your team can carry.",
  "Your industry is light on regulatory drag, so re-architecture can ship in weeks, not quarters.",
];

/**
 * Panel 03 — institutional filters describing the operator we accept.
 * Taste-based, single-sentence bullets. Numbered to feel like a checklist
 * the reader can self-score against.
 */
export function WhatWeLookFor() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 border-t border-foreground/10">
      <Reveal>
        <SectionLabel index="03">What we look for</SectionLabel>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-8 max-w-3xl text-3xl md:text-5xl font-medium tracking-tight leading-[1.1] text-foreground">
          The cohort filters
          <span className="text-foreground/55"> before we do.</span>
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-6 md:gap-4 max-w-4xl">
        {BULLETS.map((b, i) => (
          <Reveal key={i} delay={0.08 + i * 0.04}>
            <li className="group flex items-start gap-5 border-t border-foreground/10 pt-6">
              <span className="font-mono text-xs text-foreground/40 pt-1 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                {b}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
