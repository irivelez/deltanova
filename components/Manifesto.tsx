export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="px-6 md:px-12 lg:px-24 py-24 md:py-32 border-t border-foreground/10"
    >
      <div className="max-w-4xl">
        <blockquote className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground tracking-tight">
          &ldquo;Make AI adoption transparent.
          <br />
          Customers don&rsquo;t realize they adopted AI.
          <br />
          <span className="text-foreground/60">
            They realize their business got better.&rdquo;
          </span>
        </blockquote>
        <div className="mt-10 text-sm font-mono text-foreground/50">
          — Deltanova thesis · May 2026
        </div>
      </div>
    </section>
  );
}
