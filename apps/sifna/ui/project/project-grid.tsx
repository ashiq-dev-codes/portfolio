import { aspectRatio } from "@/domain/image/image-asset";
import type { Project } from "@/domain/project/project";
import { Reveal } from "@/ui/components/reveal";
import { ProjectCard } from "@/ui/project/project-card";

type ProjectGridProps = {
  projects: Project[];
};

const cardSizes = "(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 90vw";
const staggerStep = 0.07;
const staggerGroup = 4;
// Flexbox hands out only part of a row's spare space when the grow values add up to less than 1
// (a lone tall poster is ~0.7), so scale them up: proportions stay the same, rows fill fully.
const growScale = 100;

// Justified rows: each work grows in proportion to its shape, so every image in a row ends up
// the same height, nothing is cropped, and the order reads left to right like her list in Studio.
// --row-height is the target height; rows stretch a little to fill the width.
export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="py-16 text-center text-muted">New work is on its way. Check back soon.</p>;
  }

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-5 [--row-height:9.5rem] sm:gap-x-5 sm:gap-y-8 sm:[--row-height:14rem] lg:[--row-height:16rem]">
      {projects.map((project, index) => {
        const ratio = aspectRatio(project.cover);
        return (
          <li
            key={project.slug}
            className="min-w-0"
            style={{ flexGrow: ratio * growScale, flexBasis: `calc(${ratio} * var(--row-height))` }}
          >
            <Reveal delay={(index % staggerGroup) * staggerStep}>
              <ProjectCard project={project} sizes={cardSizes} />
            </Reveal>
          </li>
        );
      })}
      {/* Soaks up the space in the last row, so a few leftover works keep their size. */}
      <li aria-hidden="true" className="grow-[100000]" />
    </ul>
  );
}
