import { emailUrl, type Profile } from "@/domain/profile/profile";
import { contactSectionId } from "@/ui/components/nav-items";
import { Reveal } from "@/ui/components/reveal";
import { WordReveal } from "@/ui/components/word-reveal";
import { ContactButtons } from "@/ui/profile/contact-buttons";
import { SocialLinks } from "@/ui/profile/social-links";

type SiteFooterProps = {
  profile: Profile;
};

// The footer is also the contact section, so "Contact" (#contact) works from every page.
// On phones its bottom padding leaves room for the floating MobileNav.
export function SiteFooter({ profile }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      id={contactSectionId}
      className="page-container mt-10 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:mt-16 md:pb-8"
    >
      <Reveal className="glass relative isolate overflow-hidden rounded-[2rem] px-5 py-14 text-center sm:px-10 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1/2 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-accent),transparent)] opacity-30"
        />
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-accent">Contact</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            <WordReveal text="Let’s work together." accentWordCount={1} />
          </h2>
          <p className="mt-4 text-base text-pretty text-muted sm:text-lg">
            Have an app to build or a team to join? I’d love to hear about it.
          </p>
          <a
            href={emailUrl(profile.email)}
            className="mt-6 inline-block py-2 text-lg font-medium break-all text-ink underline decoration-accent/50 decoration-2 underline-offset-8 transition-colors hover:text-accent sm:text-2xl"
          >
            {profile.email}
          </a>
        </div>
        <div className="mx-auto mt-8 max-w-md space-y-6 sm:max-w-none">
          <ContactButtons profile={profile} />
          <SocialLinks socials={profile.socials} />
        </div>
      </Reveal>
      <div className="mt-6 flex flex-col items-center gap-2 px-2 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {profile.name}
        </p>
        <p>{profile.location}</p>
      </div>
    </footer>
  );
}
