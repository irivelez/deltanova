import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

/**
 * Manifesto panel for Design B. Large blockquote, institutional attribution,
 * a thin top border that visually segments the page like Linear's pricing.
 */
export function ManifestoB() {
  return (
    <section
      id="manifesto"
      className="px-6 md:px-12 lg:px-24 py-24 md:py-32 border-t border-foreground/10"
    >
      <Reveal>
        <SectionLabel index="02">Thesis</SectionLabel>
      </Reveal>

      <Reveal delay={0.05}>
        <blockquote className="mt-10 max-w-4xl text-2xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground tracking-tight">
          &ldquo;Make AI adoption transparent.
          <br />
          Customers don&rsquo;t realize they adopted AI.
          <br />
          <span className="text-foreground/55">
            They realize their business got better.&rdquo;
          </span>
        </blockquote>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 text-sm font-mono text-foreground/50">
          — Deltanova thesis · May 2026
        </div>
      </Reveal>
    </section>
  );
}
