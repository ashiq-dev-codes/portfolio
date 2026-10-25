import { isPortrait } from "@/domain/image/image-asset";
import { featuredFirst, featuredProjects, projectsInCategory } from "@/domain/project/project";
import { categoryRepository, profileRepository, projectRepository } from "@/infrastructure/repositories";
import { PageTransition } from "@/ui/components/page-transition";
import { CategoryShowcase } from "@/ui/category/category-showcase";
import { AboutPreview } from "@/ui/profile/about-preview";
import { ProfileHero } from "@/ui/profile/profile-hero";
import { FeaturedWork } from "@/ui/project/featured-work";
import { ProjectMarquee } from "@/ui/project/project-marquee";

const maxFeaturedProjects = 8;
const maxMarqueeProjects = 16;
const maxCollageProjects = 3;

export default async function HomePage() {
  const [profile, projects, categories] = await Promise.all([
    profileRepository.get(),
    projectRepository.getAll(),
    categoryRepository.getAll(),
  ]);
  const featured = featuredProjects(projects, maxFeaturedProjects);
  const collageProjects = featuredFirst(projects)
    .filter((project) => isPortrait(project.cover))
    .slice(0, maxCollageProjects);
  const categoryPreviews = categories.map((category) => ({
    category,
    projects: featuredFirst(projectsInCategory(projects, category.slug)),
  }));

  return (
    <PageTransition>
      <ProfileHero
        profile={profile}
        collageProjects={collageProjects}
        projectCount={projects.length}
        categoryCount={categories.length}
      />
      <ProjectMarquee projects={projects.slice(0, maxMarqueeProjects)} />
      <CategoryShowcase previews={categoryPreviews} />
      <FeaturedWork projects={featured} />
      <AboutPreview profile={profile} />
    </PageTransition>
  );
}
