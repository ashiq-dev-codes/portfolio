import type { Profile } from "@/domain/profile/profile";
import { ArtworkImage } from "@/ui/components/artwork-image";

type ProfilePhotoProps = {
  profile: Profile;
};

const frameClass = "relative aspect-4/5 overflow-hidden rounded-3xl shadow-lift";

export function ProfilePhoto({ profile }: ProfilePhotoProps) {
  if (!profile.photo) return <PhotoPlaceholder name={profile.name} />;

  return (
    <div className={frameClass}>
      <ArtworkImage
        image={profile.photo}
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="size-full object-cover"
      />
    </div>
  );
}

// Until a photo is uploaded, her initials on her brand gradient keep the layout designed.
function PhotoPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2);

  return (
    <div
      role="img"
      aria-label={name}
      className={`${frameClass} grid place-items-center bg-linear-to-br from-sky via-brand to-brand-deep`}
    >
      <span className="font-mono text-8xl text-surface/90 sm:text-9xl">{initials}</span>
      <span className="absolute right-5 bottom-5 rotate-6 rounded-full bg-surface px-3 py-1 font-mono text-brand">
        sifna.
      </span>
    </div>
  );
}
