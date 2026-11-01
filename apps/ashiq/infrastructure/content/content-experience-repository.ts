import type { Experience } from "@/domain/experience/experience";
import type { ExperienceRepository } from "@/domain/experience/experience-repository";
import { experience } from "@/infrastructure/content/experience";

export class ContentExperienceRepository implements ExperienceRepository {
  async getAll(): Promise<Experience[]> {
    return experience;
  }
}
