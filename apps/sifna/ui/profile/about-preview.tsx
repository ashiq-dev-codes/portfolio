import type { Profile } from "@/domain/profile/profile";
import { ButtonLink } from "@/ui/components/button-link";
import { Reveal } from "@/ui/components/reveal";
import { SectionHeading } from "@/ui/components/section-heading";
import { ProfilePhoto } from "@/ui/profile/profile-photo";
import { SoftwareList } from "@/ui/profile/software-list";

type AboutPreviewProps = {
  profile: Profile;
};

export function AboutPreview({ profile }: AboutPreviewProps) {
  return (
    <section className="page-container grid items-center gap-10 py-14 sm:gap-12 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <Reveal className="mx-auto w-full max-w-[17rem] sm:max-w-sm lg:max-w-none">
        <ProfilePhoto profile={profile} />
      </Reveal>
      <div>
        <SectionHeading eyebrow="About me" title={`Hi, I’m ${profile.name}`} />
        {profile.about && (
          <Reveal delay={0.1}>
            <p className="mt-6 line-clamp-5 text-lg text-pretty text-muted">{profile.about}</p>
          </Reveal>
        )}
        <Reveal delay={0.2} className="mt-8">
          <SoftwareList software={profile.software} />
        </Reveal>
        <Reveal delay={0.3} className="mt-8 grid sm:mt-10 sm:block">
          <ButtonLink href="/about" variant="secondary" icon="arrow-right">
            More about me
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
