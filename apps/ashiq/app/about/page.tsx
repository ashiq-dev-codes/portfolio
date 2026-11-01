import type { Metadata } from "next";
import { experienceRepository, profileRepository, skillRepository } from "@/infrastructure/repositories";
import { PageTransition } from "@/ui/components/page-transition";
import { SectionHeading } from "@/ui/components/section-heading";
import { ExperienceTimeline } from "@/ui/experience/experience-timeline";
import { AboutIntro } from "@/ui/profile/about-intro";
import { EducationAndLanguages } from "@/ui/profile/education-and-languages";
import { SkillGroups } from "@/ui/skill/skill-groups";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const [profile, experience, skills] = await Promise.all([
    profileRepository.get(),
    experienceRepository.getAll(),
    skillRepository.getAll(),
  ]);

  return (
    <PageTransition>
      <AboutIntro profile={profile} />
      <section className="page-container pt-20 sm:pt-28">
        <SectionHeading eyebrow="experience" title="Where I’ve built" />
        <div className="mt-10">
          <ExperienceTimeline experience={experience} />
        </div>
      </section>
      <SkillGroups groups={skills} />
      <EducationAndLanguages profile={profile} />
    </PageTransition>
  );
}
