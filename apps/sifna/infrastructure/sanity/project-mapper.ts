import type { ImageAsset } from "@/domain/image/image-asset";
import type { Project } from "@/domain/project/project";
import { categoryProjection, mapCategory, type RawCategory } from "@/infrastructure/sanity/category-mapper";
import { imageProjection, mapImage, type RawImage } from "@/infrastructure/sanity/image-mapper";

export type RawProject = {
  title?: string | null;
  slug?: string | null;
  category?: RawCategory | null;
  images?: RawImage[] | null;
  description?: string | null;
  year?: number | null;
  isFeatured?: boolean | null;
  order?: number | null;
};

export const projectProjection = `{
  title,
  "slug": slug.current,
  "category": category->${categoryProjection},
  "images": images[]${imageProjection},
  description,
  year,
  isFeatured,
  order
}`;

const untitled = "Untitled project";

/** Returns null for a project that can't be shown yet: no link name, category or image. */
export function mapProject(raw: RawProject): Project | null {
  const title = raw.title?.trim() || untitled;
  const category = raw.category ? mapCategory(raw.category) : null;
  const images = (raw.images ?? [])
    .map((image) => mapImage(image, title))
    .filter((image): image is ImageAsset => image !== null);

  if (!raw.slug || !category || images.length === 0) return null;

  return {
    slug: raw.slug,
    title,
    category,
    cover: images[0],
    images,
    description: raw.description?.trim() || null,
    year: raw.year ?? null,
    isFeatured: raw.isFeatured ?? false,
    order: raw.order ?? null,
  };
}
