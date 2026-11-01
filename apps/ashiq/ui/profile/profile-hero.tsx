import Image from "next/image";
import type { Profile } from "@/domain/profile/profile";
import { ButtonLink } from "@/ui/components/button-link";
import { Reveal } from "@/ui/components/reveal";
import { AvailabilityBadge } from "@/ui/profile/availability-badge";
import { ProfilePhoto } from "@/ui/profile/profile-photo";

type ProfileHeroProps = {
  profile: Profile;
};

// Where each floating tag sits around the photo, and how far out of step it floats.
const tagPlacements = ["-left-10 top-[12%]", "-right-8 top-[34%]", "-left-6 bottom-[22%]", "-right-10 bottom-[6%]"];
const floatDelays = ["0s", "-1.8s", "-3.6s", "-5.4s"];

export function ProfileHero({ profile }: ProfileHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 size-[34rem] animate-float rounded-full bg-brand/20 blur-3xl motion-reduce:animate-none"
      />
      <div className="page-container relative grid items-center gap-12 pt-8 pb-10 sm:pt-16 sm:pb-16 lg:grid-cols-[1.25fr_1fr] lg:pt-24 lg:pb-24">
        <div>
          <Reveal className="flex items-center gap-3 lg:hidden">
            <Image
              src={profile.photo.url}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              sizes="56px"
              preload
              loading="eager"
              className="size-14 rounded-full object-cover ring-2 ring-brand/60"
            />
            <AvailabilityBadge text={profile.availability} />
          </Reveal>
          <Reveal className="mt-6 hidden lg:block">
            <AvailabilityBadge text={profile.availability} />
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-6 font-mono text-sm text-brand sm:text-base">
              <span aria-hidden="true" className="text-muted">{"> "}</span>
              {profile.tagline}
              <span aria-hidden="true" className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-caret bg-brand motion-reduce:animate-none" />
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mt-4 text-[2.75rem] leading-[0.98] font-semibold tracking-tight text-balance sm:text-7xl xl:text-[5.25rem]">
              <HeadlineWithGradient headline={profile.headline} />
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-xl text-base text-pretty text-muted sm:text-lg">{profile.intro}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <ButtonLink href="/work" icon="arrow-right">
                View work
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <HeroPhoto profile={profile} />
      </div>
    </section>
  );
}

// The last two words get the brand gradient: "...people actually use."
function HeadlineWithGradient({ headline }: { headline: string }) {
  const words = headline.split(" ");
  const highlightCount = 2;
  const plain = words.slice(0, -highlightCount).join(" ");
  const highlighted = words.slice(-highlightCount).join(" ");
  return (
    <>
      {plain} <span className="text-gradient">{highlighted}</span>
    </>
  );
}

function HeroPhoto({ profile }: ProfileHeroProps) {
  return (
    <Reveal delay={0.2} className="relative mx-auto hidden w-full max-w-sm lg:block">
      <ProfilePhoto photo={profile.photo} sizes="(min-width: 1024px) 384px, 0px" isPriority />
      {profile.heroTags.slice(0, tagPlacements.length).map((tag, index) => (
        <span
          key={tag}
          aria-hidden="true"
          style={{ animationDelay: floatDelays[index] }}
          className={`absolute ${tagPlacements[index]} animate-float rounded-full border border-line bg-surface/90 px-3.5 py-1.5 font-mono text-xs text-ink shadow-card backdrop-blur motion-reduce:animate-none`}
        >
          <span className="text-brand">#</span>
          {tag}
        </span>
      ))}
    </Reveal>
  );
}
