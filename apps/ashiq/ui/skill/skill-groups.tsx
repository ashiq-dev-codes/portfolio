import type { SkillGroup } from "@/domain/skill/skill";
import { Reveal } from "@/ui/components/reveal";
import { SectionHeading } from "@/ui/components/section-heading";
import { TechChips } from "@/ui/project/tech-chips";

type SkillGroupsProps = {
  groups: SkillGroup[];
};

const staggerStep = 0.06;
const staggerGroup = 3;

export function SkillGroups({ groups }: SkillGroupsProps) {
  if (groups.length === 0) return null;

  return (
    <section className="page-container py-14 sm:py-20">
      <SectionHeading eyebrow="skills" title="The toolkit behind the apps" />
      <ul className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, index) => (
          <li key={group.name} className={index === groups.length - 1 ? lastItemSpan(groups.length) : undefined}>
            <Reveal
              delay={(index % staggerGroup) * staggerStep}
              className="h-full rounded-3xl border border-line bg-surface/60 p-6 transition duration-300 hover:border-brand/40 hover:bg-surface"
            >
              <h3 className="text-lg font-semibold">{group.name}</h3>
              <div className="mt-4">
                <TechChips items={group.skills} />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

// A last card alone in its row stretches across it instead of leaving a gap beside it
// (2 columns on tablets, 3 on desktops).
function lastItemSpan(count: number): string {
  const tabletSpan = count % 2 === 1 ? "sm:col-span-2" : "";
  const desktopSpan = count % 3 === 1 ? "lg:col-span-3" : "lg:col-span-1";
  return `${tabletSpan} ${desktopSpan}`;
}
