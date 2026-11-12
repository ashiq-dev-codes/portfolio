import type { SkillGroup } from "@/domain/skill/skill";
import { Reveal } from "@/ui/components/reveal";
import { SectionTitle } from "@/ui/components/section-title";

type SkillListProps = {
  groups: SkillGroup[];
};

const staggerStep = 0.06;

/** Each skill group as a glass card of chips; two columns of cards from tablets up. */
export function SkillList({ groups }: SkillListProps) {
  if (groups.length === 0) return null;

  return (
    <section className="page-container py-14 sm:py-20">
      <SectionTitle label="Skills" title="The toolkit behind the apps" />
      <dl className="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-14 md:grid-cols-2">
        {groups.map((group, index) => (
          <Reveal
            key={group.name}
            delay={(index % 2) * staggerStep}
            className="glass rounded-3xl p-5 transition-colors duration-300 hover:border-white/20 sm:p-6"
          >
            <dt className="flex items-center gap-2 font-medium">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gradient-to-br from-accent to-accent-deep" />
              {group.name}
            </dt>
            <dd className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-line bg-white/5 px-3 py-1.5 text-sm text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
                >
                  {skill}
                </span>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
