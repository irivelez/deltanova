import Link from "next/link";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

/**
 * Closing CTA panel — repeats the institutional apply action with the
 * scarcity microcopy in mono, sitting just above the footer.
 */
export function CtaRepeat() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-28 md:py-36 border-t border-foreground/10">
      <Reveal>
        <SectionLabel index="06">Apply</SectionLabel>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-8 max-w-4xl text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] text-foreground">
          If you recognized your business
          <br />
          <span className="text-foreground/55">in the filters above —</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:gap-8 gap-4">
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
      </Reveal>
    </section>
  );
}
