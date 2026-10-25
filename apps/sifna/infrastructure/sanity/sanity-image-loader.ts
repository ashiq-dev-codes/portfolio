"use client";

import type { ImageLoaderProps } from "next/image";

const defaultQuality = 80;

// Sanity's CDN resizes and converts images on request, which lets next/image work in a static
// export. `fit=max` never upscales past the original upload.
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? defaultQuality));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
