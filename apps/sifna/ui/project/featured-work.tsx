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
    <section className="page-container py-14 sm:py-20">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Selected work" title="A few favourites" />
        <div className="hidden sm:block">
          <SeeAllWorkButton />
        </div>
      </div>
      <div className="mt-8 sm:mt-12">
        <ProjectGrid projects={projects} />
      </div>
      {/* On phones the button follows the work, where the thumb is after scrolling through it. */}
      <div className="mt-2 grid sm:hidden">
        <SeeAllWorkButton />
      </div>
    </section>
  );
}

function SeeAllWorkButton() {
  return (
    <ButtonLink href="/work" variant="secondary" icon="arrow-right">
      See all work
    </ButtonLink>
  );
}
