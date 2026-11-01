/** An image ready to show. `blurDataUrl` is a tiny preview, or null when the source has none. */
export type ImageAsset = {
  url: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl: string | null;
};

export function isPortrait(image: ImageAsset): boolean {
  return image.height > image.width;
}

/** Width divided by height: below 1 for tall images, above 1 for wide ones. */
export function aspectRatio(image: ImageAsset): number {
  return image.height > 0 ? image.width / image.height : 1;
}
