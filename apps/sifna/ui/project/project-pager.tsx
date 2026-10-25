import Link from "next/link";
import type { Project, ProjectNeighbours } from "@/domain/project/project";
import { ArtworkImage } from "@/ui/components/artwork-image";
import { Icon } from "@/ui/components/icon";

type ProjectPagerProps = {
  neighbours: ProjectNeighbours;
};

export function ProjectPager({ neighbours }: ProjectPagerProps) {
  return (
    <nav aria-label="More projects" className="page-container grid gap-4 pb-8 sm:grid-cols-2">
      <PagerLink project={neighbours.previous} label="Previous" direction="previous" />
      <PagerLink project={neighbours.next} label="Next" direction="next" />
    </nav>
  );
}

type PagerLinkProps = {
  project: Project;
  label: string;
  direction: "previous" | "next";
};

function PagerLink({ project, label, direction }: PagerLinkProps) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex min-w-0 items-center gap-4 rounded-2xl border border-line bg-surface p-3 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift active:scale-[0.98] ${isNext ? "flex-row-reverse text-right" : ""}`}
    >
      <div className="size-20 shrink-0 overflow-hidden rounded-xl">
        <ArtworkImage
          image={project.cover}
          sizes="80px"
          className="size-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`flex items-center gap-1.5 font-mono text-xs text-muted ${isNext ? "justify-end" : ""}`}
        >
          {!isNext && <Icon name="arrow-left" className="size-4 transition-transform group-hover:-translate-x-1" />}
          {label}
          {isNext && <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />}
        </p>
        <p className="mt-1 truncate font-medium">{project.title}</p>
      </div>
    </Link>
  );
}
