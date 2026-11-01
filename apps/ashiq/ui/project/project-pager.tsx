import Link from "next/link";
import type { Project, ProjectNeighbours } from "@/domain/project/project";
import { Icon } from "@/ui/components/icon";

type ProjectPagerProps = {
  neighbours: ProjectNeighbours;
};

export function ProjectPager({ neighbours }: ProjectPagerProps) {
  return (
    <nav aria-label="More projects" className="page-container grid gap-4 pb-8 sm:grid-cols-2">
      <PagerLink project={neighbours.previous} direction="previous" />
      <PagerLink project={neighbours.next} direction="next" />
    </nav>
  );
}

function PagerLink({ project, direction }: { project: Project; direction: "previous" | "next" }) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex min-w-0 flex-col gap-1 rounded-2xl border border-line bg-surface/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/50 active:scale-[0.98] ${isNext ? "items-end text-right" : ""}`}
    >
      <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
        {!isNext && <Icon name="arrow-left" className="size-4 transition-transform group-hover:-translate-x-1" />}
        {isNext ? "Next" : "Previous"}
        {isNext && <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />}
      </span>
      {/* max-w-full keeps "…" working when the card aligns its text to the right. */}
      <span className="max-w-full truncate text-lg font-semibold">{project.title}</span>
      <span className="max-w-full truncate text-sm text-muted">{project.tagline}</span>
    </Link>
  );
}
