/**
 * Small institutional section label. Mono, restrained — anchors each panel
 * without competing with the headline copy beneath it.
 */
export function SectionLabel({
  index,
  children,
}: {
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground/45">
      {index ? (
        <span className="text-emerald-400/70 select-none">{index}</span>
      ) : null}
      <span>{children}</span>
    </div>
  );
}
