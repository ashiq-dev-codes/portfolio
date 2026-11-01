import type { RawProject } from "@/infrastructure/sanity/project-mapper";

/**
 * Puts projects in the order Sifna last published with "Publish order" in Studio.
 * Projects added since then come first (new work shows at the top straight away), in their
 * Studio order. Studio's `lib/work-order.ts` (`liveOrder`) follows the same rule.
 */
export function inPublishedOrder(projects: RawProject[], publishedIds: string[]): RawProject[] {
  const publishedIndex = new Map(publishedIds.map((id, index) => [id, index]));
  const indexOf = (project: RawProject) => publishedIndex.get(project._id ?? "");
  const newProjects = projects.filter((project) => indexOf(project) === undefined);
  const publishedProjects = projects
    .filter((project) => indexOf(project) !== undefined)
    .sort((first, second) => (indexOf(first) ?? 0) - (indexOf(second) ?? 0));
  return [...newProjects, ...publishedProjects];
}
