import type { CategoryRepository } from "@/domain/category/category-repository";
import type { ProfileRepository } from "@/domain/profile/profile-repository";
import type { ProjectRepository } from "@/domain/project/project-repository";
import { SanityCategoryRepository } from "@/infrastructure/sanity/sanity-category-repository";
import { SanityProfileRepository } from "@/infrastructure/sanity/sanity-profile-repository";
import { SanityProjectRepository } from "@/infrastructure/sanity/sanity-project-repository";

// The only place that names the implementations. Routes import from here.
export const projectRepository: ProjectRepository = new SanityProjectRepository();
export const categoryRepository: CategoryRepository = new SanityCategoryRepository();
export const profileRepository: ProfileRepository = new SanityProfileRepository();
