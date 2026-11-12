import type { Profile } from "@/domain/profile/profile";
import { Reveal } from "@/ui/components/reveal";
import { SectionTitle } from "@/ui/components/section-title";

type BackgroundSectionProps = {
  profile: Profile;
};

/** Education and languages, side by side from tablets up. */
export function BackgroundSection({ profile }: BackgroundSectionProps) {
  const { education, languages } = profile;
  if (education.length === 0 && languages.length === 0) return null;

  return (
    <section className="page-container py-14 sm:py-20">
      <SectionTitle label="Background" title="Education & languages" />
      <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:mt-14 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {education.map((item) => (
          <Reveal key={item.degree} className="glass rounded-3xl p-6">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              {item.period}
            </span>
            <p className="mt-4 text-xl font-semibold">{item.degree}</p>
            <p className="mt-1 text-pretty text-muted">{item.place}</p>
          </Reveal>
        ))}
        {languages.length > 0 && (
          <Reveal delay={0.06} className="glass rounded-3xl p-6">
            <p className="text-sm text-muted">Languages</p>
            <ul className="mt-4 space-y-2 text-lg font-medium">
              {languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
