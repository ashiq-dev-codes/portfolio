"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

type TiltCardProps = {
  children: ReactNode;
  /** Size and corner classes; the glare follows the same rounded corners. */
  className?: string;
};

const maxTiltDegrees = 6;
const tiltSpring = { stiffness: 260, damping: 24 };
const centre = 0.5;

/**
 * With a mouse, the card tilts toward the pointer like a sheet of glass and a soft light follows
 * it. Touch screens and reduced motion get the plain card.
 */
export function TiltCard({ children, className = "" }: TiltCardProps) {
  const isReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(centre);
  const pointerY = useMotionValue(centre);
  const glareOpacity = useSpring(0, tiltSpring);
  const springX = useSpring(pointerX, tiltSpring);
  const springY = useSpring(pointerY, tiltSpring);
  const rotateY = useTransform(springX, [0, 1], [-maxTiltDegrees, maxTiltDegrees]);
  const rotateX = useTransform(springY, [0, 1], [maxTiltDegrees, -maxTiltDegrees]);
  const glareX = useTransform(springX, [0, 1], ["-50%", "50%"]);
  const glareY = useTransform(springY, [0, 1], ["-50%", "50%"]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || isReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
    glareOpacity.set(1);
  }

  function handlePointerLeave() {
    pointerX.set(centre);
    pointerY.set(centre);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <motion.div
          style={{ x: glareX, y: glareY, opacity: glareOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(255_255_255/0.13),transparent_55%)]"
        />
      </div>
    </motion.div>
  );
}
