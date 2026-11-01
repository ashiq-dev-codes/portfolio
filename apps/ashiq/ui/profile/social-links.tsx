import type { SocialLink } from "@/domain/profile/profile";
import { Icon, type IconName } from "@/ui/components/icon";

type SocialLinksProps = {
  socials: SocialLink[];
};

/** Round icon buttons for LinkedIn, GitHub and any other profile link. */
export function SocialLinks({ socials }: SocialLinksProps) {
  if (socials.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3">
      {socials.map((social) => (
        <li key={social.url}>
          <a
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            title={social.label}
            className="grid size-12 place-items-center rounded-full border border-line bg-surface text-muted transition duration-200 hover:-translate-y-0.5 hover:border-brand/60 hover:text-ink active:scale-95"
          >
            <Icon name={iconFor(social.label)} />
          </a>
        </li>
      ))}
    </ul>
  );
}

// Known networks get their own icon; anything else gets a plain outward arrow.
function iconFor(label: string): IconName {
  const name = label.toLowerCase();
  if (name.includes("github")) return "github";
  if (name.includes("linkedin")) return "linkedin";
  return "arrow-up-right";
}
