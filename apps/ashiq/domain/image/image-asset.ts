/** An image ready to show. Local images live in `public/` and are already sized and compressed. */
export type ImageAsset = {
  url: string;
  alt: string;
  width: number;
  height: number;
};
