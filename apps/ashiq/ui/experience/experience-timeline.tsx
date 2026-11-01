import type { Experience } from "@/domain/experience/experience";
import { Reveal } from "@/ui/components/reveal";

type ExperienceTimelineProps = {
  experience: Experience[];
};

const staggerStep = 0.05;

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  if (experience.length === 0) return null;

  return (
    <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-10">
      {experience.map((job) => (
        <li key={`${job.company}-${job.role}`} className="relative">
          <span className="absolute top-2 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-brand ring-4 ring-paper sm:-left-[calc(2.5rem+5px)]" />
          <Reveal>
            <p className="font-mono text-sm text-brand">{job.period}</p>
            <h3 className="mt-1 text-xl font-semibold sm:text-2xl">{job.role}</h3>
            <p className="text-muted">
              {job.company} · {job.location}
            </p>
          </Reveal>
          <ul className="mt-4 space-y-2">
            {job.points.map((point, index) => (
              <li key={point}>
                <Reveal delay={index * staggerStep} className="flex gap-3 text-pretty text-ink/85">
                  <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-muted" />
                  {point}
                </Reveal>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
