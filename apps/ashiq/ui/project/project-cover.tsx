import type { Project } from "@/domain/project/project";

type ProjectCoverProps = {
  project: Project;
  /** The wider version on the project page. */
  isLarge?: boolean;
};

/**
 * A designed cover instead of a screenshot: client apps are private, and CSS stays sharp at any
 * size with no image to load. Apps show a glass phone, packages and the backend a glass terminal.
 */
export function ProjectCover({ project, isLarge = false }: ProjectCoverProps) {
  return (
    <div
      className={`relative isolate grid place-items-center overflow-hidden rounded-2xl border border-line bg-paper/60 ${isLarge ? "aspect-[16/9] sm:aspect-[2.4/1]" : "aspect-[16/10]"}`}
    >
      <div aria-hidden="true" className="absolute -top-1/3 -right-1/4 -z-10 size-3/4 rounded-full bg-[radial-gradient(closest-side,var(--color-accent),transparent)] opacity-40 transition-transform duration-700 group-hover:scale-125" />
      <div aria-hidden="true" className="absolute -bottom-1/2 -left-1/4 -z-10 size-3/4 rounded-full bg-[radial-gradient(closest-side,var(--color-accent-deep),transparent)] opacity-35 transition-transform duration-700 group-hover:scale-125" />
      <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        <CoverArt project={project} />
      </div>
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

// A glass phone next to the project's headline number; it tilts a little when the card is hovered.
function PhoneArt({ project }: { project: Project }) {
  const metric = project.metrics[0];
  return (
    <div aria-hidden="true" className="flex items-center gap-6 p-6 sm:gap-10">
      <div className="glass flex aspect-[9/17] h-32 flex-col gap-2 rounded-[1.4rem] p-3 transition-transform duration-500 group-hover:-rotate-6 sm:h-44">
        <span className="mx-auto h-1 w-8 rounded-full bg-white/20" />
        <span className="mt-2 h-2 w-3/4 rounded-full bg-gradient-to-r from-accent to-accent-deep" />
        <span className="h-2 w-1/2 rounded-full bg-white/15" />
        <span className="h-2 w-2/3 rounded-full bg-white/10" />
        <span className="mt-auto h-7 rounded-lg bg-gradient-to-r from-accent to-accent-deep" />
      </div>
      {metric && (
        <div className="min-w-0 text-left">
          <p className="text-gradient text-4xl font-semibold tracking-tight sm:text-6xl">{metric.value}</p>
          <p className="mt-1 text-sm text-muted">{metric.label}</p>
        </div>
      )}
    </div>
  );
}

function TerminalArt({ lines }: { lines: string[] }) {
  return (
    <div aria-hidden="true" className="w-full max-w-sm p-6">
      <div className="glass rounded-xl transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex gap-1.5 border-b border-line px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-accent/80" />
          <span className="size-2.5 rounded-full bg-silver/60" />
          <span className="size-2.5 rounded-full bg-white/25" />
        </div>
        <div className="space-y-1.5 px-4 py-4 text-left font-mono text-xs sm:text-sm">
          {lines.map((line, index) => (
            <p key={line} className={`truncate ${index === 0 ? "text-ink" : "text-accent"}`}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
