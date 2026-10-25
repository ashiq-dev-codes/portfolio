import Link from "next/link";
import type { Project } from "@/domain/project/project";
import { ArtworkImage } from "@/ui/components/artwork-image";
import { ProjectCoverTransition } from "@/ui/project/project-cover-transition";

type ProjectCardProps = {
  project: Project;
  sizes: string;
};

export function ProjectCard({ project, sizes }: ProjectCardProps) {
  const imageCount = project.images.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      <ProjectCoverTransition projectSlug={project.slug}>
        <div className="relative overflow-hidden rounded-2xl bg-surface shadow-card transition duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-lift group-active:scale-[0.98]">
          <ArtworkImage
            image={project.cover}
            sizes={sizes}
            className="h-auto w-full transition duration-500 ease-out group-hover:scale-[1.04]"
          />
          {imageCount > 1 && (
            <span className="absolute top-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-xs text-surface backdrop-blur">
              {imageCount} images
            </span>
          )}
        </div>
      </ProjectCoverTransition>
      <div className="mt-2.5 flex items-baseline justify-between gap-3 px-1 sm:mt-3">
        <h3 className="text-sm leading-snug font-medium transition-colors group-hover:text-brand sm:text-base">
          {project.title}
        </h3>
        <span className="hidden shrink-0 font-mono text-xs text-muted sm:inline">
          {project.category.title}
        </span>
      </div>
    </Link>
  );
}
