import type { ImageAsset } from "@/domain/image/image-asset";
import type { Education, Profile, SocialLink } from "@/domain/profile/profile";
import type { Metric } from "@/domain/project/project";

/** The profile as written in `profile.ts`, shaped like a CMS document. */
export type RawProfile = {
  name: string;
  role: string;
  tagline?: string;
  headline?: string;
  intro?: string;
  about?: string[];
  location?: string;
  availability?: string;
  photo: ImageAsset;
  email: string;
  whatsApp?: string | null;
  socials?: SocialLink[];
  cvUrl?: string | null;
  stats?: Metric[];
  education?: Education[];
  languages?: string[];
};

export function mapProfile(raw: RawProfile): Profile {
  return {
    name: raw.name.trim(),
    role: raw.role.trim(),
    tagline: raw.tagline?.trim() || raw.role,
    headline: raw.headline?.trim() || raw.role,
    intro: raw.intro?.trim() ?? "",
    about: raw.about ?? [],
    location: raw.location?.trim() ?? "",
    availability: raw.availability?.trim() ?? "",
    photo: { ...raw.photo, alt: raw.photo.alt.trim() || raw.name },
    email: raw.email.trim(),
    whatsApp: raw.whatsApp?.trim() || null,
    socials: raw.socials ?? [],
    cvUrl: raw.cvUrl?.trim() || null,
    stats: raw.stats ?? [],
    education: raw.education ?? [],
    languages: raw.languages ?? [],
  };
}
