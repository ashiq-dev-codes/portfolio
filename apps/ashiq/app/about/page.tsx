import type { Metadata } from "next";
import { experienceRepository, profileRepository, skillRepository } from "@/infrastructure/repositories";
import { PageTransition } from "@/ui/components/page-transition";
import { ExperienceList } from "@/ui/experience/experience-list";
import { AboutHeader } from "@/ui/profile/about-header";
import { BackgroundSection } from "@/ui/profile/background-section";
import { SkillList } from "@/ui/skill/skill-list";

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
      <AboutHeader profile={profile} />
      <ExperienceList experience={experience} />
      <SkillList groups={skills} />
      <BackgroundSection profile={profile} />
    </PageTransition>
  );
}
