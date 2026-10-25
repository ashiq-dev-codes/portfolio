import Link from "next/link";
import type { Project } from "@/domain/project/project";
import { ArtworkImage } from "@/ui/components/artwork-image";

type ProjectMarqueeProps = {
  projects: Project[];
};

// The list is drawn twice and slides by half its width, so the loop never shows a gap.
// It pauses on hover, and stops (but can be scrolled) for visitors who prefer less motion.
export function ProjectMarquee({ projects }: ProjectMarqueeProps) {
  const loop = [...projects, ...projects];

  return (
    <section aria-label="A glimpse of the work" className="overflow-hidden py-6 motion-reduce:overflow-x-auto">
      <ul className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-6">
        {loop.map((project, index) => {
          const isCopy = index >= projects.length;
          return (
            <li key={`${project.slug}-${index}`} aria-hidden={isCopy || undefined}>
              <Link
                href={`/projects/${project.slug}`}
                tabIndex={isCopy ? -1 : undefined}
                className="block h-44 overflow-hidden rounded-xl shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:h-64"
              >
                <ArtworkImage
                  image={project.cover}
                  sizes="(min-width: 640px) 380px, 260px"
                  className="h-full w-auto transition duration-500 hover:scale-105"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
