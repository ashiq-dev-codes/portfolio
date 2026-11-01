import { featuredProjects } from "@/domain/project/project";
import { allSkills } from "@/domain/skill/skill";
import {
  experienceRepository,
  profileRepository,
  projectRepository,
  skillRepository,
} from "@/infrastructure/repositories";
import { PageTransition } from "@/ui/components/page-transition";
import { ExperiencePreview } from "@/ui/experience/experience-preview";
import { ProfileHero } from "@/ui/profile/profile-hero";
import { StatsRow } from "@/ui/profile/stats-row";
import { FeaturedWork } from "@/ui/project/featured-work";
import { SkillGroups } from "@/ui/skill/skill-groups";
import { TechMarquee } from "@/ui/skill/tech-marquee";

const maxFeaturedProjects = 4;

export default async function HomePage() {
  const [profile, projects, experience, skills] = await Promise.all([
    profileRepository.get(),
    projectRepository.getAll(),
    experienceRepository.getAll(),
    skillRepository.getAll(),
  ]);

  return (
    <PageTransition>
      <ProfileHero profile={profile} />
      <StatsRow stats={profile.stats} />
      <TechMarquee items={allSkills(skills)} />
      <FeaturedWork projects={featuredProjects(projects, maxFeaturedProjects)} />
      <ExperiencePreview experience={experience} />
      <SkillGroups groups={skills} />
    </PageTransition>
  );
}
