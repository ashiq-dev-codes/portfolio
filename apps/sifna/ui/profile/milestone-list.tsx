import type { Milestone } from "@/domain/profile/profile";
import { Reveal } from "@/ui/components/reveal";

type MilestoneListProps = {
  title: string;
  milestones: Milestone[];
};

const staggerStep = 0.08;

export function MilestoneList({ title, milestones }: MilestoneListProps) {
  if (milestones.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <ol className="mt-6 border-l border-line">
        {milestones.map((milestone, index) => (
          <li key={`${milestone.title}-${index}`} className="relative pb-8 pl-6 last:pb-0">
            <span className="absolute top-2 -left-[5px] size-2.5 rounded-full bg-brand ring-4 ring-paper" />
            <Reveal delay={index * staggerStep}>
              {milestone.period && (
                <p className="font-mono text-sm text-brand">{milestone.period}</p>
              )}
              <h3 className="mt-1 text-lg font-medium">{milestone.title}</h3>
              {milestone.place && <p className="text-muted">{milestone.place}</p>}
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
