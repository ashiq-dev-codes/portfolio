import Link from "next/link";
import type { Project } from "@/domain/project/project";
import { Icon } from "@/ui/components/icon";
import { TiltCard } from "@/ui/components/tilt-card";
import { ProjectCover } from "@/ui/project/project-cover";
import { ProjectCoverTransition } from "@/ui/project/project-cover-transition";

type ProjectCardProps = {
  project: Project;
};

const maxCardTools = 3;

// A large glass card. With a mouse it tilts toward the pointer; on hover the cover art zooms,
// the edge warms and the arrow turns toward the viewer.
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <TiltCard className="h-full rounded-3xl">
      <Link
        href={`/projects/${project.slug}`}
        className="glass group flex h-full flex-col rounded-3xl p-3 transition duration-300 ease-out hover:border-accent/50 hover:shadow-glow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.99]"
      >
        <ProjectCoverTransition projectSlug={project.slug}>
          <div>
            <ProjectCover project={project} />
          </div>
        </ProjectCoverTransition>
        <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
              <p className="mt-1.5 text-pretty text-muted">{project.tagline}</p>
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-white/5 text-muted transition duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-deep group-hover:text-paper">
              <Icon name="arrow-right" className="size-5 -rotate-45" />
            </span>
          </div>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-5 text-xs text-muted">
            <li className="rounded-full bg-white/10 px-2.5 py-1 text-ink">{project.role}</li>
            {project.stack.slice(0, maxCardTools).map((tool) => (
              <li key={tool} className="rounded-full border border-line px-2.5 py-1">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </TiltCard>
  );
}
