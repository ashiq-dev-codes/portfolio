import type { Category } from "@/domain/category/category";
import type { ImageAsset } from "@/domain/image/image-asset";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  cover: ImageAsset;
  /** Every image in order, starting with the cover. */
  images: ImageAsset[];
  description: string | null;
  year: number | null;
  isFeatured: boolean;
  order: number | null;
};

export type ProjectNeighbours = {
  previous: Project;
  next: Project;
};

/** Lower `order` first. Projects without an order go last, by title. */
export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort(compareProjects);
}

export function featuredProjects(projects: Project[], max: number): Project[] {
  return projects.filter((project) => project.isFeatured).slice(0, max);
}

/** Same projects, featured ones moved to the front. Keeps the order within each group. */
export function featuredFirst(projects: Project[]): Project[] {
  const featured = projects.filter((project) => project.isFeatured);
  const others = projects.filter((project) => !project.isFeatured);
  return [...featured, ...others];
}

export function projectsInCategory(projects: Project[], categorySlug: string): Project[] {
  return projects.filter((project) => project.category.slug === categorySlug);
}

export function findProject(projects: Project[], slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}

/** The projects before and after this one, wrapping around the ends. Null if there is no other. */
export function projectNeighbours(projects: Project[], slug: string): ProjectNeighbours | null {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return null;

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { previous, next };
}

function compareProjects(first: Project, second: Project): number {
  if (first.order === second.order) return first.title.localeCompare(second.title);
  if (first.order === null) return 1;
  if (second.order === null) return -1;
  return first.order - second.order;
}
