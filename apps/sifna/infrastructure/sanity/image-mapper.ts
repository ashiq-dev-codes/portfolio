import type { ImageAsset } from "@/domain/image/image-asset";

export type RawImage = {
  alt?: string | null;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  lqip?: string | null;
} | null;

export const imageProjection = `{
  alt,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

/** Returns null while the image has no uploaded file. Empty alt text falls back to `fallbackAlt`. */
export function mapImage(raw: RawImage | undefined, fallbackAlt: string): ImageAsset | null {
  if (!raw?.url || !raw.width || !raw.height) return null;

  return {
    url: raw.url,
    alt: raw.alt?.trim() || fallbackAlt,
    width: raw.width,
    height: raw.height,
    blurDataUrl: raw.lqip ?? null,
  };
}
