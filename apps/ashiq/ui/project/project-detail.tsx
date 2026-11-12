import Link from "next/link";
import { projectKindLabel, type Project } from "@/domain/project/project";
import { ButtonLink } from "@/ui/components/button-link";
import { CountUp } from "@/ui/components/count-up";
import { Icon } from "@/ui/components/icon";
import { Reveal } from "@/ui/components/reveal";
import { WordReveal } from "@/ui/components/word-reveal";
import { ProjectCover } from "@/ui/project/project-cover";
import { ProjectCoverTransition } from "@/ui/project/project-cover-transition";

type ProjectDetailProps = {
  project: Project;
};

const staggerStep = 0.05;

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="page-container pt-4 pb-8 sm:pt-10 sm:pb-14">
      <Link
        href="/work"
        className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <Icon name="arrow-left" className="size-5 transition-transform group-hover:-translate-x-1" />
        All work
      </Link>
      <div className="mx-auto mt-6 max-w-3xl text-center">
        <Reveal>
          <p className="glass inline-flex rounded-full px-3.5 py-1.5 text-sm font-medium text-ink/90">
            {projectKindLabel(project.kind)}
          </p>
        </Reveal>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          <WordReveal text={project.title} delay={0.08} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-pretty text-muted sm:text-xl">{project.tagline}</p>
        </Reveal>
      </div>
      <div className="mt-10">
        <ProjectCoverTransition projectSlug={project.slug}>
          <div>
            <ProjectCover project={project} isLarge />
          </div>
        </ProjectCoverTransition>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-14">
        <ProjectStory project={project} />
        <ProjectFacts project={project} />
      </div>
    </article>
  );
}

function ProjectStory({ project }: ProjectDetailProps) {
  return (
    <div>
      <Reveal>
        <p className="text-lg leading-relaxed text-pretty sm:text-xl">{project.summary}</p>
      </Reveal>
      {project.highlights.length > 0 && (
        <div className="mt-10">
          <Reveal>
            <h2 className="text-xl font-semibold">What I built</h2>
          </Reveal>
          <ul className="mt-5 space-y-4">
            {project.highlights.map((highlight, index) => (
              <li key={highlight}>
                <Reveal delay={index * staggerStep} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-paper">
                    <Icon name="check" className="size-4" />
                  </span>
                  <span className="text-pretty text-ink/90">{highlight}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// The side column: on desktop it stays in view while the story scrolls.
function ProjectFacts({ project }: ProjectDetailProps) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <Reveal className="glass space-y-6 rounded-3xl p-6">
        {project.metrics.length > 0 && (
          <dl className="grid grid-cols-2 gap-5">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-muted">{metric.label}</dt>
                <dd className="text-gradient text-3xl font-semibold tracking-tight">
                  <CountUp value={metric.value} />
                </dd>
              </div>
            ))}
          </dl>
        )}
        <dl className="grid gap-3 border-t border-line pt-5 text-sm">
          <Fact label="Role" value={project.role} />
          <Fact label="When" value={project.period} />
          <Fact label="Built with" value={project.stack.join(", ")} />
        </dl>
        <div className="grid gap-3 border-t border-line pt-5">
          {project.links.map((link) => (
            <ButtonLink key={link.url} href={link.url} variant="secondary" icon="arrow-up-right">
              {link.label}
            </ButtonLink>
          ))}
          <ButtonLink href="#contact" icon="arrow-right">
            Build something like this
          </ButtonLink>
        </div>
      </Reveal>
    </aside>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-pretty">{value}</dd>
    </div>
  );
}
