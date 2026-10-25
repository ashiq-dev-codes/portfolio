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
