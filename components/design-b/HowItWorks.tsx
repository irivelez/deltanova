import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const STEPS = [
  {
    n: "01",
    title: "Apply",
    body: "Submit the filter question. One operational loop, end-to-end, and why your team hasn't already automated it.",
  },
  {
    n: "02",
    title: "Discovery",
    body: "If accepted, a 90-minute call within 7 days. We map the business — customers, money, bottlenecks — together.",
  },
  {
    n: "03",
    title: "Re-architecture",
    body: "Discovery memo within 7 days of the call. A closed-loop AI-native substrate in production within 90 days.",
  },
];

/**
 * Panel 05 — three numbered steps in a row on desktop, stacked on mobile.
 * Mirrors Lindy's "how it works" rhythm and Linear's structured numbering.
 */
export function HowItWorks() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 border-t border-foreground/10">
      <Reveal>
        <SectionLabel index="05">How it works</SectionLabel>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-8 max-w-3xl text-3xl md:text-5xl font-medium tracking-tight leading-[1.1] text-foreground">
          From application to
          <span className="text-foreground/55"> production in 90 days.</span>
        </h2>
      </Reveal>

      <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={0.08 + i * 0.08}>
            <li className="relative border-t border-foreground/15 pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-emerald-400/70 tabular-nums">
                  {s.n}
                </span>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">
                  {s.title}
                </h3>
              </div>
              <p className="mt-4 text-base md:text-lg text-foreground/65 leading-relaxed">
                {s.body}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
