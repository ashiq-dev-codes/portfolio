import type { Metadata } from "next";
import { groupByKind } from "@/domain/project/project";
import { projectRepository } from "@/infrastructure/repositories";
import { PageTransition } from "@/ui/components/page-transition";
import { SectionHeading } from "@/ui/components/section-heading";
import { ProjectGroups } from "@/ui/project/project-groups";

export const metadata: Metadata = {
  title: "Work",
};

const workIntro = "Production apps, open-source packages and backend work, with what I built in each.";

export default async function WorkPage() {
  const projects = await projectRepository.getAll();

  return (
    <PageTransition>
      <section className="page-container pt-8 pb-4 sm:pt-16 sm:pb-8">
        <SectionHeading isPageTitle eyebrow={`${projects.length} projects`} title="Work" text={workIntro} />
        <ProjectGroups groups={groupByKind(projects)} />
      </section>
    </PageTransition>
  );
}
