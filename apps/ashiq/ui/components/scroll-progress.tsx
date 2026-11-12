"use client";

import { motion, useScroll, useSpring } from "motion/react";

const progressSpring = { stiffness: 200, damping: 40, restDelta: 0.001 };

/** A thin cyan line at the very top that fills as the visitor scrolls the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, progressSpring);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-accent to-accent-deep"
    />
  );
}
