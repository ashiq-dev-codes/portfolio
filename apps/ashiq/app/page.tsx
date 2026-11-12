import { featuredProjects } from "@/domain/project/project";
import {
  experienceRepository,
  profileRepository,
  projectRepository,
  skillRepository,
} from "@/infrastructure/repositories";
import { PageTransition } from "@/ui/components/page-transition";
import { ExperienceList } from "@/ui/experience/experience-list";
import { ProfileHero } from "@/ui/profile/profile-hero";
import { FeaturedWork } from "@/ui/project/featured-work";
import { SkillList } from "@/ui/skill/skill-list";

const maxFeaturedProjects = 4;

export default async function HomePage() {
  const [profile, projects, experience, skills] = await Promise.all([
    profileRepository.get(),
    projectRepository.getAll(),
    experienceRepository.getAll(),
    skillRepository.getAll(),
  ]);
  const featured = featuredProjects(projects, maxFeaturedProjects);

  return (
    <PageTransition>
      <ProfileHero profile={profile} showcaseProjects={featured} />
      <FeaturedWork projects={featured} />
      <ExperienceList experience={experience} />
      <SkillList groups={skills} />
    </PageTransition>
  );
}
