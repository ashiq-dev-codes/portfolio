import type { Profile } from "@/domain/profile/profile";
import { Reveal } from "@/ui/components/reveal";
import { WordReveal } from "@/ui/components/word-reveal";
import { ContactButtons } from "@/ui/profile/contact-buttons";
import { ProfilePhoto } from "@/ui/profile/profile-photo";

type AboutHeaderProps = {
  profile: Profile;
};

const paragraphStagger = 0.07;

/** The About page opening, centered: photo, name, then his story in a comfortable reading column. */
export function AboutHeader({ profile }: AboutHeaderProps) {
  return (
    <section className="page-container pt-12 pb-6 sm:pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <ProfilePhoto photo={profile.photo} sizeClass="size-36 sm:size-44" isPriority />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="glass mt-10 inline-flex rounded-full px-3.5 py-1.5 text-sm font-medium text-ink/90">
            About me
          </p>
        </Reveal>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          <WordReveal text={`Hi, I’m ${profile.name}.`} delay={0.12} accentWordCount={2} />
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-3 text-muted">
            {profile.role} · {profile.location}
          </p>
        </Reveal>
      </div>
      <div className="mx-auto mt-10 max-w-2xl space-y-5">
        {profile.about.map((paragraph, index) => (
          <Reveal key={paragraph} delay={0.12 + index * paragraphStagger}>
            <p className="text-lg leading-relaxed text-pretty text-ink/85">{paragraph}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3} className="mx-auto mt-10 max-w-md sm:max-w-none">
        <ContactButtons profile={profile} />
      </Reveal>
    </section>
  );
}
