import type { Experience } from "@/domain/experience/experience";
import { Reveal } from "@/ui/components/reveal";
import { SectionTitle } from "@/ui/components/section-title";

type ExperienceListProps = {
  experience: Experience[];
};

const staggerStep = 0.08;

/** Each role as a card: period and place on top, the role, then what he did there. */
export function ExperienceList({ experience }: ExperienceListProps) {
  if (experience.length === 0) return null;

  return (
    <section className="page-container py-14 sm:py-20">
      <SectionTitle label="Experience" title="Where I’ve been building" />
      <ol className="mx-auto mt-10 max-w-3xl space-y-5 sm:mt-14">
        {experience.map((job, index) => (
          <li key={`${job.company}-${job.role}`}>
            <Reveal
              delay={index * staggerStep}
              className="glass rounded-3xl p-6 transition-colors duration-300 hover:border-white/20 sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-medium text-accent">
                  {job.period}
                </span>
                <span className="text-muted">{job.location}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{job.role}</h3>
              <p className="text-muted">{job.company}</p>
              <ul className="mt-5 space-y-2.5">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-pretty text-ink/85">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-deep" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
