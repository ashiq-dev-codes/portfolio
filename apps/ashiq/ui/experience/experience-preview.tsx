import type { Experience } from "@/domain/experience/experience";
import { ButtonLink } from "@/ui/components/button-link";
import { SectionHeading } from "@/ui/components/section-heading";
import { ExperienceTimeline } from "@/ui/experience/experience-timeline";

type ExperiencePreviewProps = {
  experience: Experience[];
};

/** Home page: the current role only, with a link to the full story on About. */
export function ExperiencePreview({ experience }: ExperiencePreviewProps) {
  const latest = experience.slice(0, 1);
  if (latest.length === 0) return null;

  return (
    <section className="page-container grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
      <div>
        <SectionHeading eyebrow="experience" title="Where I build today" />
        <div className="mt-8 hidden lg:block">
          <MoreAboutMeButton />
        </div>
      </div>
      <div>
        <ExperienceTimeline experience={latest} />
        <div className="mt-8 grid lg:hidden">
          <MoreAboutMeButton />
        </div>
      </div>
    </section>
  );
}

function MoreAboutMeButton() {
  return (
    <ButtonLink href="/about" variant="secondary" icon="arrow-right">
      More about me
    </ButtonLink>
  );
}
