import Link from "next/link";
import type { ImageAsset } from "@/domain/image/image-asset";
import type { Project } from "@/domain/project/project";
import { ArtworkImage } from "@/ui/components/artwork-image";
import { ButtonLink } from "@/ui/components/button-link";
import { Eyebrow } from "@/ui/components/eyebrow";
import { Icon } from "@/ui/components/icon";
import { Reveal } from "@/ui/components/reveal";
import { ProjectCoverTransition } from "@/ui/project/project-cover-transition";

type ProjectDetailProps = {
  project: Project;
};

const imageSizes = "(min-width: 1024px) 60vw, 100vw";

export function ProjectDetail({ project }: ProjectDetailProps) {
  const otherImages = project.images.slice(1);

  return (
    <article className="page-container grid gap-10 pt-8 pb-16 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
      <ProjectInfo project={project} />
      <div className="space-y-6 sm:space-y-8">
        <ProjectCoverTransition projectSlug={project.slug}>
          <ProjectImage image={project.cover} isPriority />
        </ProjectCoverTransition>
        {otherImages.map((image) => (
          <Reveal key={image.url}>
            <ProjectImage image={image} />
          </Reveal>
        ))}
      </div>
    </article>
  );
}

function ProjectInfo({ project }: ProjectDetailProps) {
  const categoryHref = `/work/${project.category.slug}`;

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <Reveal>
        <Link
          href={categoryHref}
          className="group inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-ink"
        >
          <Icon name="arrow-left" className="size-5 transition-transform group-hover:-translate-x-1" />
          All {project.category.title.toLowerCase()}
        </Link>
        <Eyebrow className="mt-6 text-brand">{project.category.title}</Eyebrow>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {project.title}
        </h1>
        {project.description && (
          <p className="mt-5 text-lg whitespace-pre-line text-pretty text-muted">{project.description}</p>
        )}
        <ProjectFacts project={project} />
        <div className="mt-8">
          <ButtonLink href="#contact" icon="arrow-right">
            Want one like this?
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}

function ProjectFacts({ project }: ProjectDetailProps) {
  const imageCount = project.images.length;

  return (
    <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-line py-5 font-mono text-sm">
      <div>
        <dt className="text-muted">Category</dt>
        <dd className="mt-1">{project.category.title}</dd>
      </div>
      {project.year && (
        <div>
          <dt className="text-muted">Year</dt>
          <dd className="mt-1">{project.year}</dd>
        </div>
      )}
      {imageCount > 1 && (
        <div>
          <dt className="text-muted">Images</dt>
          <dd className="mt-1">{imageCount}</dd>
        </div>
      )}
    </dl>
  );
}

// Never wider than the upload itself, so small images stay crisp instead of being stretched.
function ProjectImage({ image, isPriority = false }: { image: ImageAsset; isPriority?: boolean }) {
  return (
    <div
      className="mx-auto overflow-hidden rounded-2xl bg-surface shadow-lift"
      style={{ maxWidth: image.width }}
    >
      <ArtworkImage image={image} sizes={imageSizes} className="h-auto w-full" isPriority={isPriority} />
    </div>
  );
}
