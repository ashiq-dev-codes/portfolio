import type { Project } from "@/domain/project/project";
import { ButtonLink } from "@/ui/components/button-link";
import { Reveal } from "@/ui/components/reveal";
import { SectionTitle } from "@/ui/components/section-title";
import { ProjectGrid } from "@/ui/project/project-grid";

type FeaturedWorkProps = {
  projects: Project[];
};

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  if (projects.length === 0) return null;

  return (
    <section className="page-container py-14 sm:py-20">
      <SectionTitle label="Selected work" title="Things I’ve built and shipped" />
      <div className="mt-10 sm:mt-14">
        <ProjectGrid projects={projects} />
      </div>
      <Reveal className="mt-10 flex justify-center">
        <ButtonLink href="/work" variant="secondary" icon="arrow-right">
          See all work
        </ButtonLink>
      </Reveal>
    </section>
  );
}
