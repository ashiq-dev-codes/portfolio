import { projectKindLabel, type Project } from "@/domain/project/project";
import { Icon } from "@/ui/components/icon";

type PhoneScreenProps = {
  project: Project;
};

const maxScreenHighlights = 2;

/** One project drawn as an app screen inside the hero iPhone: icon, headline number, highlights. */
export function PhoneScreen({ project }: PhoneScreenProps) {
  const metric = project.metrics[0];

  return (
    <div className="flex h-full flex-col bg-[radial-gradient(120%_60%_at_50%_0%,rgb(84_197_248/0.22),transparent_70%)] px-4 pt-3 pb-4 text-left">
      <StatusBar />
      <div className="mt-9 flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-[0.9rem] bg-gradient-to-br from-accent to-accent-deep text-lg font-bold text-paper shadow-glow">
          {project.title.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold">{project.title}</p>
          <p className="text-xs text-muted">{projectKindLabel(project.kind)}</p>
        </div>
      </div>
      {metric && (
        <div className="glass mt-4 rounded-2xl p-4">
          <p className="text-gradient text-4xl font-semibold tracking-tight">{metric.value}</p>
          <p className="mt-0.5 text-xs text-muted">{metric.label}</p>
        </div>
      )}
      <p className="mt-4 text-sm leading-snug text-pretty text-ink/85">{project.tagline}</p>
      <ul className="mt-3 space-y-2">
        {project.highlights.slice(0, maxScreenHighlights).map((highlight) => (
          <li key={highlight} className="flex gap-2 text-[11px] leading-snug text-muted">
            <Icon name="check" className="mt-px size-3.5 shrink-0 text-accent" />
            <span className="line-clamp-2">{highlight}</span>
          </li>
        ))}
      </ul>
      <span className="mt-auto flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-ink text-sm font-medium text-paper">
        Open project
        <Icon name="arrow-right" className="size-4" />
      </span>
    </div>
  );
}

// The time and the signal and battery icons, as drawn on an iPhone lock screen.
function StatusBar() {
  return (
    <div aria-hidden="true" className="flex items-center justify-between px-3 text-[11px] font-semibold">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-px">
          <span className="h-1 w-[3px] rounded-sm bg-ink" />
          <span className="h-1.5 w-[3px] rounded-sm bg-ink" />
          <span className="h-2 w-[3px] rounded-sm bg-ink" />
          <span className="h-2.5 w-[3px] rounded-sm bg-ink/40" />
        </span>
        <span className="ml-1 flex h-2.5 w-5 items-center rounded-[3px] border border-ink/50 p-px">
          <span className="h-full w-3/4 rounded-[1px] bg-ink" />
        </span>
      </span>
    </div>
  );
}
