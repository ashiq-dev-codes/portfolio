"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Transition } from "motion/react";
import type { Project } from "@/domain/project/project";
import { TiltCard } from "@/ui/components/tilt-card";
import { PhoneScreen } from "@/ui/project/phone-screen";

type ProjectPhoneShowcaseProps = {
  projects: Project[];
};

const autoAdvanceMs = 3800;
const screenTransition: Transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
const dotSpring: Transition = { type: "spring", stiffness: 420, damping: 34 };

/**
 * A titanium iPhone whose screen plays through the projects; tap it to open the one showing.
 * It pauses while the visitor hovers or focuses it, and the dots below pick a project directly.
 */
export function ProjectPhoneShowcase({ projects }: ProjectPhoneShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const project = projects[activeIndex];

  useEffect(() => {
    if (isPaused || projects.length < 2) return;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % projects.length), autoAdvanceMs);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, projects.length]);

  if (!project) return null;

  return (
    <div
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="flex flex-col items-center"
    >
      <TiltCard className="rounded-[2.9rem]">
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`Open ${project.title}`}
          className="relative block w-[15.5rem] rounded-[2.9rem] bg-gradient-to-b from-silver via-[#6b7684] to-silver p-[3px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95),0_0_80px_-20px_rgb(84_197_248/0.35)] transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent active:scale-[0.98] sm:w-[17rem]"
        >
          <PhoneButtons />
          <div className="rounded-[2.75rem] bg-black p-[7px]">
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.3rem] bg-[#0a0e13]">
              <span aria-hidden="true" className="absolute top-2.5 left-1/2 z-20 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.94 }}
                  transition={screenTransition}
                  className="absolute inset-0"
                >
                  <PhoneScreen project={project} />
                </motion.div>
              </AnimatePresence>
              {/* Light falling across the glass screen. */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/12 via-transparent to-transparent" />
              <span aria-hidden="true" className="absolute bottom-1.5 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-ink/70" />
            </div>
          </div>
        </Link>
      </TiltCard>
      <div className="mt-5 flex items-center">
        {projects.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${item.title}`}
            aria-pressed={index === activeIndex}
            className="group grid size-11 place-items-center"
          >
            <span className="relative block h-2 w-2 rounded-full bg-white/25 transition-colors group-hover:bg-white/50">
              {index === activeIndex && (
                <motion.span layoutId="showcase-dot" transition={dotSpring} className="absolute -inset-x-2 inset-y-0 rounded-full bg-accent" />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// The side buttons on the titanium frame.
function PhoneButtons() {
  return (
    <span aria-hidden="true">
      <span className="absolute top-24 -left-[3px] h-7 w-[3px] rounded-l bg-silver/70" />
      <span className="absolute top-36 -left-[3px] h-12 w-[3px] rounded-l bg-silver/70" />
      <span className="absolute top-32 -right-[3px] h-16 w-[3px] rounded-r bg-silver/70" />
    </span>
  );
}
