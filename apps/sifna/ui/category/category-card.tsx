import Link from "next/link";
import type { Category } from "@/domain/category/category";
import type { Project } from "@/domain/project/project";
import { ArtworkImage } from "@/ui/components/artwork-image";
import { Icon } from "@/ui/components/icon";

type CategoryCardProps = {
  category: Category;
  projects: Project[];
};

// Three covers fanned like cards in a hand; they spread wider on hover.
const fanPlacements = [
  "right-[30%] -rotate-12 group-hover:-translate-x-8 group-hover:-rotate-[18deg]",
  "right-[16%] -rotate-3 group-hover:-translate-y-3",
  "right-[2%] rotate-8 group-hover:translate-x-4 group-hover:rotate-[14deg]",
];

export function CategoryCard({ category, projects }: CategoryCardProps) {
  const previews = projects.slice(0, fanPlacements.length);
  const projectLabel = projects.length === 1 ? "project" : "projects";

  return (
    <Link
      href={`/work/${category.slug}`}
      className="group relative flex h-[19rem] flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift active:scale-[0.98] sm:h-96 sm:p-8"
    >
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold tracking-tight">{category.title}</h3>
          <p className="mt-1 font-mono text-sm text-brand">
            {projects.length} {projectLabel}
          </p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper transition duration-300 group-hover:rotate-[-45deg] group-hover:bg-brand group-hover:text-surface">
          <Icon name="arrow-right" />
        </span>
      </div>
      {category.description && (
        <p className="relative z-10 mt-3 max-w-[16rem] text-pretty text-muted">{category.description}</p>
      )}
      {previews.map((project, index) => (
        <div
          key={project.slug}
          className={`absolute -bottom-8 w-[38%] transition duration-500 ease-out sm:-bottom-10 sm:w-[34%] ${fanPlacements[index]}`}
        >
          <div className="aspect-3/4 overflow-hidden rounded-xl border-4 border-surface shadow-lift">
            <ArtworkImage image={project.cover} sizes="(min-width: 640px) 14vw, 30vw" className="size-full object-cover" />
          </div>
        </div>
      ))}
    </Link>
  );
}
