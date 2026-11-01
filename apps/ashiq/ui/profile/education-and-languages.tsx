import type { Profile } from "@/domain/profile/profile";
import { Reveal } from "@/ui/components/reveal";

type EducationAndLanguagesProps = {
  profile: Profile;
};

export function EducationAndLanguages({ profile }: EducationAndLanguagesProps) {
  const { education, languages } = profile;
  if (education.length === 0 && languages.length === 0) return null;

  return (
    <section className="page-container grid gap-4 py-14 sm:grid-cols-2 sm:gap-6 sm:py-20">
      {education.length > 0 && (
        <Reveal className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-8">
          <h2 className="font-mono text-sm text-muted">Education</h2>
          <ul className="mt-4 space-y-4">
            {education.map((item) => (
              <li key={item.degree}>
                <p className="font-mono text-sm text-brand">{item.period}</p>
                <p className="mt-1 text-lg font-semibold">{item.degree}</p>
                <p className="text-pretty text-muted">{item.place}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
      {languages.length > 0 && (
        <Reveal delay={0.08} className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-8">
          <h2 className="font-mono text-sm text-muted">Languages</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {languages.map((language) => (
              <li key={language} className="rounded-full border border-line bg-raised px-4 py-2">
                {language}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}
