import type { Profile } from "@/domain/profile/profile";
import type { Metric, Project } from "@/domain/project/project";
import { ButtonLink } from "@/ui/components/button-link";
import { CountUp } from "@/ui/components/count-up";
import { Reveal } from "@/ui/components/reveal";
import { WordReveal } from "@/ui/components/word-reveal";
import { ProjectPhoneShowcase } from "@/ui/project/project-phone-showcase";

type ProfileHeroProps = {
  profile: Profile;
  /** The projects the hero phone plays through. */
  showcaseProjects: Project[];
};

const stepDelay = 0.08;
const headlineAccentWords = 2;

/**
 * The home hero. Text on the left; on the right an iPhone playing through the projects, with the
 * stats floating around it as glass widgets. Phones stack it: text, phone, then the widgets.
 */
export function ProfileHero({ profile, showcaseProjects }: ProfileHeroProps) {
  return (
    <section className="page-container grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-6 lg:pt-16 lg:pb-24">
      <div className="text-center lg:text-left">
        <Reveal>
          <p className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-ink/90">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-online motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-online" />
            </span>
            {profile.availability}
          </p>
        </Reveal>
        <Reveal delay={stepDelay}>
          <p className="mt-6 text-base font-medium sm:text-lg">
            <span className="text-accent">{profile.name}</span>
            <span className="text-muted"> · {profile.role}</span>
          </p>
        </Reveal>
        <h1 className="mt-3 text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl xl:text-7xl">
          <WordReveal text={profile.headline} delay={stepDelay * 2} accentWordCount={headlineAccentWords} />
        </h1>
        <Reveal delay={stepDelay * 5}>
          <p className="mx-auto mt-6 max-w-xl text-base text-pretty text-muted sm:text-lg lg:mx-0">{profile.intro}</p>
        </Reveal>
        <Reveal
          delay={stepDelay * 6}
          className="mx-auto mt-8 grid w-full max-w-sm grid-cols-2 gap-3 sm:flex sm:max-w-none sm:justify-center lg:justify-start"
        >
          <ButtonLink href="/work" icon="arrow-right">
            View work
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            Contact
          </ButtonLink>
        </Reveal>
      </div>
      <div className="relative">
        <Reveal delay={stepDelay * 3}>
          <ProjectPhoneShowcase projects={showcaseProjects} />
        </Reveal>
        <StatWidgets stats={profile.stats} />
      </div>
    </section>
  );
}

// Where each widget floats around the phone on wide screens, overlapping its edges but never its
// Open project button; phones show them as a 2×2 grid.
const widgetPlacements = [
  "lg:-left-4 lg:top-[8%]",
  "lg:-right-6 lg:top-[26%]",
  "lg:-left-2 lg:bottom-[28%]",
  "lg:-right-4 lg:bottom-[24%]",
];
const widgetStagger = 0.1;

function StatWidgets({ stats }: { stats: Metric[] }) {
  if (stats.length === 0) return null;

  return (
    <ul className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-3 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block lg:max-w-none">
      {stats.map((stat, index) => (
        <li
          key={stat.label}
          // Each widget bobs on its own beat, like things floating in water.
          style={{ animationDelay: `${index * -1.5}s` }}
          className={`lg:pointer-events-auto lg:absolute lg:w-40 lg:animate-float lg:motion-reduce:animate-none ${widgetPlacements[index] ?? ""}`}
        >
          <Reveal delay={0.5 + index * widgetStagger} className="liquid-glass h-full rounded-3xl px-4 py-4 text-left">
            <p className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">
              <CountUp value={stat.value} />
            </p>
            <p className="mt-1 text-xs leading-snug text-pretty text-muted sm:text-sm">{stat.label}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
