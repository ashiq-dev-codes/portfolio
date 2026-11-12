import type { SkillGroup } from "@/domain/skill/skill";
import type { SkillRepository } from "@/domain/skill/skill-repository";
import { skills } from "@/infrastructure/content/skills";

export class ContentSkillRepository implements SkillRepository {
  async getAll(): Promise<SkillGroup[]> {
    return skills;
  }
}
