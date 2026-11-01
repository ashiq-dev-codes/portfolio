/** What kind of work a project is; it groups the Work page and picks each card's look. */
export type ProjectKind = "app" | "package" | "backend";

export type ProjectLink = {
  label: string;
  url: string;
};

/** A headline number, like "6" + "branded apps". */
export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  /** One line under the title. */
  tagline: string;
  summary: string;
  role: string;
  period: string;
  highlights: string[];
  stack: string[];
  metrics: Metric[];
  links: ProjectLink[];
  isFeatured: boolean;
  order: number;
};

export type ProjectGroup = {
  kind: ProjectKind;
  projects: Project[];
};

export type ProjectNeighbours = {
  previous: Project;
  next: Project;
};

/** The order kinds appear in on the Work page. */
export const projectKindOrder: ProjectKind[] = ["app", "package", "backend"];

export function projectKindLabel(kind: ProjectKind): string {
  switch (kind) {
    case "app":
      return "Apps";
    case "package":
      return "Open-source packages";
    case "backend":
      return "Backend";
  }
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((first, second) => first.order - second.order);
}

export function featuredProjects(projects: Project[], max: number): Project[] {
  return projects.filter((project) => project.isFeatured).slice(0, max);
}

/** Projects grouped by kind, in `projectKindOrder`, leaving out empty groups. */
export function groupByKind(projects: Project[]): ProjectGroup[] {
  return projectKindOrder
    .map((kind) => ({ kind, projects: projects.filter((project) => project.kind === kind) }))
    .filter((group) => group.projects.length > 0);
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
  if (!previous || !next) return null;
  return { previous, next };
}
