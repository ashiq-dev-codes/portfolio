import Image from "next/image";
import type { ImageAsset } from "@/domain/image/image-asset";

type ProfilePhotoProps = {
  photo: ImageAsset;
  /** Tailwind size classes, e.g. "size-32 sm:size-40". */
  sizeClass: string;
  /** Only for the photo at the top of a page: it loads right away instead of lazily. */
  isPriority?: boolean;
};

/** A round photo that floats gently, inside a slowly turning silver-and-cyan ring with a glow. */
export function ProfilePhoto({ photo, sizeClass, isPriority = false }: ProfilePhotoProps) {
  return (
    <div className={`relative mx-auto animate-float motion-reduce:animate-none ${sizeClass}`}>
      <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-accent/20 blur-3xl" />
      <div
        aria-hidden="true"
        className="absolute -inset-1.5 animate-spin-slow rounded-full bg-[conic-gradient(var(--color-accent),var(--color-silver),var(--color-accent-deep),var(--color-accent))] motion-reduce:animate-none"
      />
      <Image
        src={photo.url}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        preload={isPriority}
        loading={isPriority ? "eager" : "lazy"}
        className="relative size-full rounded-full object-cover object-top ring-[3px] ring-paper"
      />
    </div>
  );
}
