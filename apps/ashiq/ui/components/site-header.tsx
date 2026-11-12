import type { ImageAsset } from "@/domain/image/image-asset";
import { DynamicIsland } from "@/ui/components/dynamic-island";

type SiteHeaderProps = {
  name: string;
  photo: ImageAsset;
};

// Keeps the island's space at the top of the page; only the island itself takes clicks.
export function SiteHeader({ name, photo }: SiteHeaderProps) {
  return (
    <header className="pointer-events-none sticky top-0 z-40 flex justify-center px-3 pt-3">
      <DynamicIsland name={name} photo={photo} />
    </header>
  );
}
