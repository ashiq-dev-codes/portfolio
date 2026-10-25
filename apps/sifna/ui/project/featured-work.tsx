import type { Project } from "@/domain/project/project";
import { ButtonLink } from "@/ui/components/button-link";
import { SectionHeading } from "@/ui/components/section-heading";
import { ProjectGrid } from "@/ui/project/project-grid";

type FeaturedWorkProps = {
  projects: Project[];
};

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  if (projects.length === 0) return null;

  return (
    <section className="page-container py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Selected work" title="A few favourites" />
        <ButtonLink href="/work" variant="secondary" icon="arrow-right">
          See all work
        </ButtonLink>
      </div>
      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
