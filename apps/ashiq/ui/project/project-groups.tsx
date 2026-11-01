import { projectKindLabel, type ProjectGroup } from "@/domain/project/project";
import { Reveal } from "@/ui/components/reveal";
import { ProjectGrid } from "@/ui/project/project-grid";

type ProjectGroupsProps = {
  groups: ProjectGroup[];
};

/** The Work page body: apps, then open-source packages, then backend, each with its own grid. */
export function ProjectGroups({ groups }: ProjectGroupsProps) {
  return (
    <div className="mt-10 space-y-14 sm:mt-14 sm:space-y-20">
      {groups.map((group) => (
        <section key={group.kind} aria-labelledby={`group-${group.kind}`}>
          <Reveal className="mb-6 flex items-baseline gap-3 border-b border-line pb-4">
            <h2 id={`group-${group.kind}`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {projectKindLabel(group.kind)}
            </h2>
            <span className="font-mono text-sm text-muted">{String(group.projects.length).padStart(2, "0")}</span>
          </Reveal>
          <ProjectGrid projects={group.projects} />
        </section>
      ))}
    </div>
  );
}
