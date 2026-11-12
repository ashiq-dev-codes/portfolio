import type { Metric, Project, ProjectKind, ProjectLink } from "@/domain/project/project";

/** A project as written in `projects.ts`, shaped like a CMS document: loose strings, optional fields. */
export type RawProject = {
  slug: string;
  title: string;
  kind: string;
  tagline?: string;
  summary?: string;
  role?: string;
  period?: string;
  highlights?: string[];
  stack?: string[];
  metrics?: Metric[];
  links?: ProjectLink[];
  isFeatured?: boolean;
};

/** Turns a content entry into a Project; `order` is its place in the content file. */
export function mapProject(raw: RawProject, order: number): Project {
  return {
    slug: raw.slug,
    title: raw.title.trim(),
    kind: toProjectKind(raw.kind),
    tagline: raw.tagline?.trim() ?? "",
    summary: raw.summary?.trim() ?? "",
    role: raw.role?.trim() ?? "",
    period: raw.period?.trim() ?? "",
    highlights: raw.highlights ?? [],
    stack: raw.stack ?? [],
    metrics: raw.metrics ?? [],
    links: raw.links ?? [],
    isFeatured: raw.isFeatured ?? false,
    order,
  };
}

// Unknown kinds fall back to "app", so a typo never breaks the build.
function toProjectKind(kind: string): ProjectKind {
  switch (kind) {
    case "package":
    case "backend":
      return kind;
    default:
      return "app";
  }
}
