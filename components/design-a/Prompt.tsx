/**
 * Static `$` prompt label for section breaks. Builder-elite restraint.
 */
export function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/40">
      <span className="text-emerald-400/60 mr-2 select-none">$</span>
      {children}
    </div>
  );
}
