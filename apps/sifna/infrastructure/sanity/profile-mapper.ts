import { maxSoftwareLevel, type Milestone, type Profile, type SocialLink, type Software } from "@/domain/profile/profile";
import { imageProjection, mapImage, type RawImage } from "@/infrastructure/sanity/image-mapper";

export type RawProfile = {
  name?: string | null;
  role?: string | null;
  headline?: string | null;
  about?: string | null;
  photo?: RawImage;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  socials?: RawSocialLink[] | null;
  education?: RawMilestone[] | null;
  experience?: RawMilestone[] | null;
  software?: RawSoftware[] | null;
};

type RawSocialLink = { label?: string | null; url?: string | null };
type RawMilestone = { title?: string | null; place?: string | null; period?: string | null };
type RawSoftware = { name?: string | null; level?: number | null };

export const profileProjection = `{
  name,
  role,
  headline,
  about,
  "photo": photo${imageProjection},
  email,
  phone,
  location,
  socials,
  education,
  experience,
  software
}`;

const defaultName = "Portfolio";
const defaultRole = "Graphic Designer";
const defaultSoftwareLevel = 3;

export function mapProfile(raw: RawProfile): Profile {
  const name = raw.name?.trim() || defaultName;
  const role = raw.role?.trim() || defaultRole;

  return {
    name,
    role,
    headline: raw.headline?.trim() || role,
    about: raw.about?.trim() || null,
    photo: mapImage(raw.photo, name),
    email: raw.email?.trim() || null,
    phone: raw.phone?.trim() || null,
    location: raw.location?.trim() || null,
    socials: (raw.socials ?? []).flatMap(mapSocialLink),
    education: (raw.education ?? []).flatMap(mapMilestone),
    experience: (raw.experience ?? []).flatMap(mapMilestone),
    software: (raw.software ?? []).flatMap(mapSoftware),
  };
}

// The helpers below return an empty array to drop half-filled entries.
function mapSocialLink(raw: RawSocialLink): SocialLink[] {
  if (!raw.url) return [];
  return [{ label: raw.label?.trim() || raw.url, url: raw.url }];
}

function mapMilestone(raw: RawMilestone): Milestone[] {
  const title = raw.title?.trim();
  if (!title) return [];
  return [{ title, place: raw.place?.trim() || null, period: raw.period?.trim() || null }];
}

function mapSoftware(raw: RawSoftware): Software[] {
  const name = raw.name?.trim();
  if (!name) return [];
  const level = Math.min(Math.max(raw.level ?? defaultSoftwareLevel, 1), maxSoftwareLevel);
  return [{ name, level }];
}
