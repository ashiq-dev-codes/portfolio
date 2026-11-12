"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before starting, to stagger items in a list. */
  delay?: number;
  className?: string;
};

const revealDuration = 0.6;
const startScale = 0.96;
const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fades its children in with a slight zoom the first time they scroll into view. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: startScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: revealDuration, delay, ease: easeOutSoft }}
    >
      {children}
    </motion.div>
  );
}
