import type { Profile } from "@/domain/profile/profile";
import { Reveal } from "@/ui/components/reveal";
import { SectionHeading } from "@/ui/components/section-heading";
import { AvailabilityBadge } from "@/ui/profile/availability-badge";
import { ContactActions } from "@/ui/profile/contact-actions";
import { ProfilePhoto } from "@/ui/profile/profile-photo";
import { SocialLinks } from "@/ui/profile/social-links";

type AboutIntroProps = {
  profile: Profile;
};

const staggerStep = 0.08;

export function AboutIntro({ profile }: AboutIntroProps) {
  return (
    <section className="page-container grid items-start gap-12 pt-8 sm:pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <Reveal className="mx-auto w-full max-w-[17rem] sm:max-w-sm lg:sticky lg:top-24 lg:max-w-none">
        <ProfilePhoto photo={profile.photo} sizes="(min-width: 1024px) 40vw, 80vw" isPriority />
      </Reveal>
      <div>
        <SectionHeading isPageTitle eyebrow={profile.role.toLowerCase()} title={`Hi, I’m ${profile.name}.`} />
        <Reveal delay={0.06} className="mt-6">
          <AvailabilityBadge text={profile.availability} />
        </Reveal>
        <div className="mt-8 space-y-5">
          {profile.about.map((paragraph, index) => (
            <Reveal key={paragraph} delay={0.1 + index * staggerStep}>
              <p className="text-lg leading-relaxed text-pretty text-ink/85">{paragraph}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3} className="mt-10 flex flex-col gap-6">
          <ContactActions profile={profile} />
          <SocialLinks socials={profile.socials} />
        </Reveal>
      </div>
    </section>
  );
}
