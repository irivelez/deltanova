import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const NEGATIONS = [
  "We are not a consulting firm. We do not write decks, frameworks, or roadmap documents.",
  "We are not an AI plug-in for your existing operation — we rebuild the operating model underneath it.",
  "We are not selling AI adoption. We sell what comes after: a business your customers experience as upgraded.",
  "We are not a vendor you manage. The work is co-built or it is not done.",
];

/**
 * Panel 04 — sharp contrarian filters. Mirrors Linear's "What Linear is not"
 * energy: confident, single-sentence, no hedging.
 */
export function WhatWereNot() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 border-t border-foreground/10">
      <Reveal>
        <SectionLabel index="04">What we&rsquo;re not</SectionLabel>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-8 max-w-3xl text-3xl md:text-5xl font-medium tracking-tight leading-[1.1] text-foreground">
          Clear about what
          <span className="text-foreground/55"> Deltanova isn&rsquo;t.</span>
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-6 md:gap-4 max-w-4xl">
        {NEGATIONS.map((b, i) => (
          <Reveal key={i} delay={0.08 + i * 0.05}>
            <li className="flex items-start gap-5 border-t border-foreground/10 pt-6">
              <span
                aria-hidden
                className="font-mono text-xs text-foreground/40 pt-1 select-none"
              >
                ×
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
