import type { ExperienceRepository } from "@/domain/experience/experience-repository";
import type { ProfileRepository } from "@/domain/profile/profile-repository";
import type { ProjectRepository } from "@/domain/project/project-repository";
import type { SkillRepository } from "@/domain/skill/skill-repository";
import { ContentExperienceRepository } from "@/infrastructure/content/content-experience-repository";
import { ContentProfileRepository } from "@/infrastructure/content/content-profile-repository";
import { ContentProjectRepository } from "@/infrastructure/content/content-project-repository";
import { ContentSkillRepository } from "@/infrastructure/content/content-skill-repository";

// The only place that names the implementations. Routes import from here.
export const projectRepository: ProjectRepository = new ContentProjectRepository();
export const profileRepository: ProfileRepository = new ContentProfileRepository();
export const experienceRepository: ExperienceRepository = new ContentExperienceRepository();
export const skillRepository: SkillRepository = new ContentSkillRepository();
