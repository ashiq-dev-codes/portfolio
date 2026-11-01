export type SkillGroup = {
  name: string;
  skills: string[];
};

/** Every skill across all groups, once each, in group order. */
export function allSkills(groups: SkillGroup[]): string[] {
  return [...new Set(groups.flatMap((group) => group.skills))];
}
