import type { ImageAsset } from "@/domain/image/image-asset";
import type { Metric } from "@/domain/project/project";

export type SocialLink = {
  label: string;
  url: string;
};

export type Education = {
  degree: string;
  place: string;
  period: string;
};

export type Profile = {
  name: string;
  role: string;
  /** The small line above the headline, e.g. "Flutter developer → AI engineering". */
  tagline: string;
  headline: string;
  intro: string;
  about: string[];
  location: string;
  availability: string;
  photo: ImageAsset;
  email: string;
  /** With country code; shown only as a WhatsApp button, never printed. */
  whatsApp: string | null;
  socials: SocialLink[];
  /** A public CV without phone numbers, or null to hide the download button. */
  cvUrl: string | null;
  stats: Metric[];
  /** A few tools shown floating around the photo on the home page. */
  heroTags: string[];
  education: Education[];
  languages: string[];
};

export function emailUrl(email: string): string {
  return `mailto:${email}`;
}

export function whatsAppUrl(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}
