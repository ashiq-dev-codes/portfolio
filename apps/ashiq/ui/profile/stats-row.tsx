import type { Metric } from "@/domain/project/project";
import { Reveal } from "@/ui/components/reveal";

type StatsRowProps = {
  stats: Metric[];
};

const staggerStep = 0.08;

export function StatsRow({ stats }: StatsRowProps) {
  if (stats.length === 0) return null;

  return (
    <section aria-label="At a glance" className="page-container">
      <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4" style={{ gap: 1 }}>
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * staggerStep} className="flex flex-col-reverse bg-surface p-5 sm:p-7">
            <dt className="mt-2 text-sm text-pretty text-muted">{stat.label}</dt>
            <dd className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">{stat.value}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
