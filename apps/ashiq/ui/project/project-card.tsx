import Link from "next/link";
import type { Project } from "@/domain/project/project";
import { Icon } from "@/ui/components/icon";
import { ProjectCover } from "@/ui/project/project-cover";
import { ProjectCoverTransition } from "@/ui/project/project-cover-transition";
import { TechChips } from "@/ui/project/tech-chips";

type ProjectCardProps = {
  project: Project;
};

const maxCardChips = 4;

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-line bg-surface/60 p-3 transition duration-300 ease-out hover:-translate-y-1 hover:border-brand/50 hover:bg-surface hover:shadow-glow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:scale-[0.99]"
    >
      <ProjectCoverTransition projectSlug={project.slug}>
        <div>
          <ProjectCover project={project} />
        </div>
      </ProjectCoverTransition>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <p className="font-mono text-xs text-muted">{project.role}</p>
        <div className="mt-1.5 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{project.title}</h3>
          <Icon
            name="arrow-up-right"
            className="mt-1 size-5 shrink-0 text-muted transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
          />
        </div>
        <p className="mt-2 text-pretty text-muted">{project.tagline}</p>
        <div className="mt-auto pt-5">
          <TechChips items={project.stack} max={maxCardChips} />
        </div>
      </div>
    </Link>
  );
}
