"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Tasteful scroll-reveal: a small fade + 8px rise on first viewport entry.
 * Used to give Design-B panels a calm institutional cadence as the user scrolls.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 0.9, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
