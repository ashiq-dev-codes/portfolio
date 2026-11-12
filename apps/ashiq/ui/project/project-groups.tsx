import { projectKindLabel, type ProjectGroup } from "@/domain/project/project";
import { Reveal } from "@/ui/components/reveal";
import { ProjectGrid } from "@/ui/project/project-grid";

type ProjectGroupsProps = {
  groups: ProjectGroup[];
};

/** The Work page body: apps, then open-source packages, then backend, each with its own grid. */
export function ProjectGroups({ groups }: ProjectGroupsProps) {
  return (
    <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
      {groups.map((group) => (
        <section key={group.kind} aria-labelledby={`group-${group.kind}`}>
          <Reveal className="mb-6 flex items-center gap-4">
            <h2 id={`group-${group.kind}`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {projectKindLabel(group.kind)}
            </h2>
            <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
            <span className="glass grid size-8 place-items-center rounded-full text-sm text-muted">
              {group.projects.length}
            </span>
          </Reveal>
          <ProjectGrid projects={group.projects} />
        </section>
      ))}
    </div>
  );
}
