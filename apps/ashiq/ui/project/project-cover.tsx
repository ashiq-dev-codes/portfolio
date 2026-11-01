import type { Project, ProjectKind } from "@/domain/project/project";

type ProjectCoverProps = {
  project: Project;
  /** The bigger version on the project page. */
  isLarge?: boolean;
};

/**
 * A designed cover instead of a screenshot: client apps are private, and CSS stays sharp at any
 * size with no image to load. Apps show a phone, packages and the backend a terminal.
 */
export function ProjectCover({ project, isLarge = false }: ProjectCoverProps) {
  return (
    <div
      className={`relative isolate grid overflow-hidden rounded-2xl border border-line bg-surface ${isLarge ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/10]"}`}
    >
      <div aria-hidden="true" className="grid-backdrop absolute inset-0 -z-10" />
      <div aria-hidden="true" className={`absolute -z-10 size-3/4 rounded-full blur-3xl ${glowClass(project.kind)}`} />
      <CoverArt project={project} />
    </div>
  );
}

function CoverArt({ project }: { project: Project }) {
  switch (project.kind) {
    case "app":
      return <PhoneArt project={project} />;
    case "package":
      return <TerminalArt lines={[`$ flutter pub add ${project.title}`, `+ ${project.title} added`]} />;
    case "backend":
      return <TerminalArt lines={["GET /api  200 OK", "indexed · cached"]} />;
  }
}

// A phone outline carrying the project's headline number.
function PhoneArt({ project }: { project: Project }) {
  const metric = project.metrics[0];
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-6 p-6">
      <div className="flex h-[78%] min-h-28 aspect-[9/17] flex-col gap-2 rounded-[1.4rem] border border-line bg-raised/80 p-3 shadow-card transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-2">
        <span className="mx-auto h-1.5 w-8 rounded-full bg-line" />
        <span className="mt-2 h-2 w-3/4 rounded-full bg-brand/70" />
        <span className="h-2 w-1/2 rounded-full bg-line" />
        <span className="mt-auto h-8 rounded-lg bg-gradient-to-r from-brand/60 to-brand-2/60" />
      </div>
      {metric && (
        <div className="min-w-0">
          <p className="text-3xl font-semibold tracking-tight text-gradient sm:text-5xl">{metric.value}</p>
          <p className="mt-1 font-mono text-xs text-muted">{metric.label}</p>
        </div>
      )}
    </div>
  );
}

function TerminalArt({ lines }: { lines: string[] }) {
  return (
    <div aria-hidden="true" className="flex items-center justify-center p-5 sm:p-7">
      <div className="w-full max-w-sm rounded-xl border border-line bg-paper/80 shadow-card transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex gap-1.5 border-b border-line px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="space-y-1.5 px-4 py-3.5 font-mono text-[11px] sm:text-xs">
          {lines.map((line, index) => (
            <p key={line} className={`truncate ${index === 0 ? "text-ink" : "text-online"}`}>
              {line}
            </p>
          ))}
          <p className="text-muted">
            ${" "}
            <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-caret bg-brand motion-reduce:animate-none" />
          </p>
        </div>
      </div>
    </div>
  );
}

function glowClass(kind: ProjectKind): string {
  switch (kind) {
    case "app":
      return "-top-1/4 -right-1/4 bg-brand/25";
    case "package":
      return "-bottom-1/3 -left-1/4 bg-brand-2/25";
    case "backend":
      return "-top-1/3 -left-1/4 bg-online/15";
  }
}
