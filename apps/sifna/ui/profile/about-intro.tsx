import type { Profile } from "@/domain/profile/profile";
import { Reveal } from "@/ui/components/reveal";
import { SectionHeading } from "@/ui/components/section-heading";
import { ContactActions } from "@/ui/profile/contact-actions";
import { ProfilePhoto } from "@/ui/profile/profile-photo";

type AboutIntroProps = {
  profile: Profile;
};

export function AboutIntro({ profile }: AboutIntroProps) {
  return (
    <section className="page-container grid items-start gap-12 pt-10 sm:pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <Reveal className="mx-auto w-full max-w-sm lg:sticky lg:top-24 lg:max-w-none">
        <ProfilePhoto profile={profile} />
      </Reveal>
      <div>
        <SectionHeading isPageTitle eyebrow={profile.role} title={`Hi, I’m ${profile.name}`} />
        {profile.about && (
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed whitespace-pre-line text-pretty text-muted">
              {profile.about}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.2} className="mt-10">
          <ContactActions profile={profile} />
        </Reveal>
      </div>
    </section>
  );
}
