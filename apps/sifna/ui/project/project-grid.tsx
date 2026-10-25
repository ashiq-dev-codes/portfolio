import type { Project } from "@/domain/project/project";
import { Reveal } from "@/ui/components/reveal";
import { ProjectCard } from "@/ui/project/project-card";

type ProjectGridProps = {
  projects: Project[];
};

const cardSizes = "(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw";
const staggerStep = 0.07;
const largestColumnCount = 4;

// Columns instead of a grid, so posters and wide mockups keep their own shape (masonry).
export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="py-16 text-center text-muted">New work is on its way. Check back soon.</p>;
  }

  return (
    <ul className="columns-2 gap-3 sm:columns-3 sm:gap-6 lg:columns-4">
      {projects.map((project, index) => (
        <li key={project.slug} className="mb-5 break-inside-avoid sm:mb-8">
          <Reveal delay={(index % largestColumnCount) * staggerStep}>
            <ProjectCard project={project} sizes={cardSizes} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
