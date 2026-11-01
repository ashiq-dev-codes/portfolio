import Image from "next/image";
import type { ImageAsset } from "@/domain/image/image-asset";

type ProfilePhotoProps = {
  photo: ImageAsset;
  sizes: string;
  /** Only for the photo at the top of a page: it loads right away instead of lazily. */
  isPriority?: boolean;
};

/** The photo in a frame with a soft brand-coloured glow and gradient border. */
export function ProfilePhoto({ photo, sizes, isPriority = false }: ProfilePhotoProps) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand/35 to-brand-2/30 blur-2xl" />
      <div className="relative rounded-[2rem] bg-gradient-to-br from-brand/70 via-line to-brand-2/70 p-px shadow-card">
        <Image
          src={photo.url}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          preload={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          className="aspect-[4/5] h-auto w-full rounded-[calc(2rem-1px)] object-cover"
        />
      </div>
    </div>
  );
}
