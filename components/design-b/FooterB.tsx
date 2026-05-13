import Link from "next/link";

/**
 * Minimal institutional footer for Design B. Mirrors the main Footer
 * but points apply links at /b/apply for consistent cohort navigation.
 */
export function FooterB() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-foreground/10">
      <div className="max-w-5xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm font-mono text-foreground/50">
        <div>Deltanova SAS · Colombia · 2026</div>
        <div className="flex gap-6">
          <Link
            href="/b/apply"
            className="hover:text-foreground transition-colors"
          >
            Apply
          </Link>
          <a
            href="mailto:irina@deltanova.io"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
