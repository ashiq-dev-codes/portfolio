import type { Category } from "@/domain/category/category";

export type RawCategory = {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  order?: number | null;
};

export const categoryProjection = `{
  title,
  "slug": slug.current,
  description,
  order
}`;

/** Returns null for a category without a link name, since it can't have a page. */
export function mapCategory(raw: RawCategory): Category | null {
  if (!raw.slug) return null;

  return {
    slug: raw.slug,
    title: raw.title?.trim() || raw.slug,
    description: raw.description?.trim() || null,
    order: raw.order ?? 0,
  };
}
