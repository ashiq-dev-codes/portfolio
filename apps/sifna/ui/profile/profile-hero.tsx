import type { Profile } from "@/domain/profile/profile";
import type { Project } from "@/domain/project/project";
import { ButtonLink } from "@/ui/components/button-link";
import { Eyebrow } from "@/ui/components/eyebrow";
import { Reveal } from "@/ui/components/reveal";
import { ProjectCollage } from "@/ui/project/project-collage";

type ProfileHeroProps = {
  profile: Profile;
  collageProjects: Project[];
  projectCount: number;
  categoryCount: number;
};

export function ProfileHero({ profile, collageProjects, projectCount, categoryCount }: ProfileHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />
      <div className="page-container relative grid items-center gap-12 pt-8 pb-10 sm:gap-14 sm:pt-20 sm:pb-16 lg:grid-cols-[1.15fr_1fr] lg:pt-24 lg:pb-24">
        <div>
          <Reveal>
            <Eyebrow>
              {profile.name} · {profile.role}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-[2.75rem] leading-[0.98] font-semibold tracking-tight text-balance sm:mt-6 sm:text-7xl xl:text-8xl">
              {profile.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            {/* Two equal buttons side by side on phones, natural width from tablets up. */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:flex sm:flex-wrap">
              <ButtonLink href="/work" icon="arrow-right">
                View work
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Let’s talk
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <dl className="mt-10 flex gap-10 font-mono sm:mt-12">
              <HeroStat value={projectCount} label="projects" />
              <HeroStat value={categoryCount} label="disciplines" />
            </dl>
          </Reveal>
        </div>
        <ProjectCollage projects={collageProjects} />
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-1 text-sm text-muted">{label}</dt>
      <dd className="text-4xl text-brand">{value}</dd>
    </div>
  );
}

// Soft blobs in her blue gradient, echoing the backgrounds of her original portfolio.
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 -right-24 size-[30rem] animate-float rounded-full bg-sky/70 blur-3xl motion-reduce:animate-none" />
      <div
        className="absolute -bottom-40 -left-32 size-[26rem] animate-float rounded-full bg-brand/15 blur-3xl motion-reduce:animate-none"
        style={{ animationDelay: "-3s" }}
      />
    </div>
  );
}
