import Image from "next/image";
import type { ImageAsset } from "@/domain/image/image-asset";

type ArtworkImageProps = {
  image: ImageAsset;
  /** How wide the image shows at each breakpoint, so the browser downloads the right size. */
  sizes: string;
  className?: string;
  /** Only for the first image on screen: it loads right away instead of lazily. */
  isPriority?: boolean;
};

export function ArtworkImage({ image, sizes, className, isPriority = false }: ArtworkImageProps) {
  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      className={className}
      placeholder={image.blurDataUrl ? "blur" : "empty"}
      blurDataURL={image.blurDataUrl ?? undefined}
      preload={isPriority}
      loading={isPriority ? "eager" : "lazy"}
    />
  );
}
