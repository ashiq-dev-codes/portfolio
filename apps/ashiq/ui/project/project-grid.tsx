import type { Project } from "@/domain/project/project";
import { Reveal } from "@/ui/components/reveal";
import { ProjectCard } from "@/ui/project/project-card";

type ProjectGridProps = {
  projects: Project[];
};

const staggerStep = 0.08;

// Big cards, two per row from tablets up, filling rows left to right.
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
      {projects.map((project, index) => (
        <li key={project.slug}>
          <Reveal delay={(index % 2) * staggerStep} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
