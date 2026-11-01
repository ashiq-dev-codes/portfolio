import type { Experience } from "@/domain/experience/experience";

export interface ExperienceRepository {
  /** Roles, most recent first. */
  getAll(): Promise<Experience[]>;
}
