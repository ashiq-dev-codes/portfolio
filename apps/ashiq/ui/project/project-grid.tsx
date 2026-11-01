import type { Project } from "@/domain/project/project";
import { Reveal } from "@/ui/components/reveal";
import { ProjectCard } from "@/ui/project/project-card";

type GridColumns = "two" | "three";

type ProjectGridProps = {
  projects: Project[];
  /** Widest column count on desktop: "two" for a short, featured set of bigger cards. */
  columns?: GridColumns;
};

const staggerStep = 0.08;
const staggerGroup = 3;

// Cards fill rows left to right: one column on phones, two on tablets, two or three on desktops.
export function ProjectGrid({ projects, columns = "three" }: ProjectGridProps) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 sm:gap-6 ${desktopColumns(columns)}`}>
      {projects.map((project, index) => (
        <li key={project.slug}>
          <Reveal delay={(index % staggerGroup) * staggerStep} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function desktopColumns(columns: GridColumns): string {
  switch (columns) {
    case "two":
      return "lg:grid-cols-2";
    case "three":
      return "lg:grid-cols-3";
  }
}
