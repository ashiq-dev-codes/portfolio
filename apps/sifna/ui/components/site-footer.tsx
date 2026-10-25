import { emailUrl, type Profile } from "@/domain/profile/profile";
import { Eyebrow } from "@/ui/components/eyebrow";
import { Icon } from "@/ui/components/icon";
import { Reveal } from "@/ui/components/reveal";
import { ContactActions } from "@/ui/profile/contact-actions";

type SiteFooterProps = {
  profile: Profile;
};

// The footer is also the contact section, so "Let's talk" (#contact) works from every page.
export function SiteFooter({ profile }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative mt-24 overflow-hidden bg-brand-deep text-surface">
      <div
        aria-hidden="true"
        className="absolute -top-48 -right-32 size-[34rem] animate-float rounded-full bg-sky/25 blur-3xl"
      />
      <div className="page-container relative py-20 sm:py-28">
        <Reveal>
          <Eyebrow className="text-sky">Get in touch</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Have a project in mind? Let’s make it stand out.
          </h2>
        </Reveal>
        {profile.email && (
          <Reveal delay={0.1}>
            <a
              href={emailUrl(profile.email)}
              className="underline-slide mt-8 inline-block py-3 font-mono text-lg break-all text-sky sm:text-3xl"
            >
              {profile.email}
            </a>
          </Reveal>
        )}
        <Reveal delay={0.2} className="mt-8">
          <ContactActions profile={profile} isOnDark />
        </Reveal>
        <FooterBar profile={profile} year={year} />
      </div>
    </footer>
  );
}

function FooterBar({ profile, year }: { profile: Profile; year: number }) {
  return (
    <div className="mt-20 flex flex-col gap-4 border-t border-surface/15 pt-6 text-sm text-surface/70 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {year} {profile.name}
      </p>
      {profile.location && (
        <p className="flex items-center gap-2">
          <Icon name="map-pin" className="size-4" />
          {profile.location}
        </p>
      )}
      {profile.socials.length > 0 && (
        <ul className="flex flex-wrap gap-4">
          {profile.socials.map((social) => (
            <li key={social.url}>
              <a href={social.url} target="_blank" rel="noreferrer" className="hover:text-surface">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
