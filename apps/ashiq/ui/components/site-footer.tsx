import { emailUrl, type Profile } from "@/domain/profile/profile";
import { Eyebrow } from "@/ui/components/eyebrow";
import { Icon } from "@/ui/components/icon";
import { Reveal } from "@/ui/components/reveal";
import { ContactActions } from "@/ui/profile/contact-actions";
import { SocialLinks } from "@/ui/profile/social-links";

type SiteFooterProps = {
  profile: Profile;
};

// The footer is also the contact section, so "Let's talk" (#contact) works from every page.
// On phones its bottom padding leaves room for the floating MobileNav.
export function SiteFooter({ profile }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative mt-16 overflow-hidden border-t border-line pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:mt-24 md:pb-0"
    >
      <div aria-hidden="true" className="grid-backdrop absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
      />
      <div className="page-container relative pt-16 pb-10 sm:py-28">
        <Reveal>
          <Eyebrow>get in touch</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
            Have an app in mind? <span className="text-gradient">Let’s build it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href={emailUrl(profile.email)}
            className="underline-slide mt-6 inline-block py-3 font-mono text-base break-all text-brand sm:mt-8 sm:text-2xl"
          >
            {profile.email}
          </a>
        </Reveal>
        <Reveal delay={0.2} className="mt-6 flex flex-col gap-6 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <ContactActions profile={profile} />
          <SocialLinks socials={profile.socials} />
        </Reveal>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          {profile.location && (
            <p className="flex items-center gap-2">
              <Icon name="map-pin" className="size-4" />
              {profile.location}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
