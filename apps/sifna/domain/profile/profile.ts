import type { ImageAsset } from "@/domain/image/image-asset";

export type Profile = {
  name: string;
  role: string;
  headline: string;
  about: string | null;
  photo: ImageAsset | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  socials: SocialLink[];
  education: Milestone[];
  experience: Milestone[];
  software: Software[];
};

export type SocialLink = {
  label: string;
  url: string;
};

export type Milestone = {
  title: string;
  place: string | null;
  period: string | null;
};

export type Software = {
  name: string;
  level: number;
};

export const maxSoftwareLevel = 5;

export function emailUrl(email: string): string {
  return `mailto:${email}`;
}

export function phoneUrl(phone: string): string {
  return `tel:+${phoneDigits(phone)}`;
}

export function whatsAppUrl(phone: string): string {
  return `https://wa.me/${phoneDigits(phone)}`;
}

function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}
