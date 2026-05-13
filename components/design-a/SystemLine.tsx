"use client";

import { useEffect, useState } from "react";

/**
 * Fixed-position mono-font system-log line. Restrained terminal motif.
 * Updates every minute. Renders nothing until mounted to avoid hydration drift.
 */
export function SystemLine() {
  const [stamp, setStamp] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const iso = d.toISOString().slice(0, 16).replace("T", " ");
      setStamp(iso);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!stamp) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-4 right-4 z-50 select-none font-mono text-[10px] tracking-tight text-foreground/30"
    >
      <span className="text-emerald-400/40">●</span>
      <span className="ml-2">deltanova/system · {stamp} UTC · online</span>
    </div>
  );
}
