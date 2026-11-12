import type { SkillGroup } from "@/domain/skill/skill";

export interface SkillRepository {
  /** Skill groups, most important first. */
  getAll(): Promise<SkillGroup[]>;
}
