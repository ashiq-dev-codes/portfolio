"use client";

import { useEffect, useState } from "react";

/** True while the section's top has scrolled into the upper 60% of the screen. */
export function useSectionInView(sectionId: string): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry?.isIntersecting ?? false),
      { rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  return isInView;
}
