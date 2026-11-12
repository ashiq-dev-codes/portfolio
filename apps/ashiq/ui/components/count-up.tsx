"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CountUpProps = {
  /** A stat value like "40+" or "3"; values that don't start with a number are shown as they are. */
  value: string;
};

const countDuration = 1.4;
const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Counts a number up from 0 when it scrolls into view. The built HTML holds the real value, so
 * the page reads right before JavaScript runs and for search engines.
 */
export function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const isReducedMotion = useReducedMotion();
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match?.[2] ?? "";

  useEffect(() => {
    const element = ref.current;
    if (!element || target === null || !isInView || isReducedMotion) return;
    // Writes straight into the text instead of re-rendering React on every frame.
    const controls = animate(0, target, {
      duration: countDuration,
      ease: easeOutSoft,
      onUpdate: (current) => {
        element.textContent = `${Math.round(current)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, isReducedMotion, target, suffix]);

  return <span ref={ref}>{value}</span>;
}
