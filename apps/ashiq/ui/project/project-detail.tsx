import Link from "next/link";
import { projectKindLabel, type Project } from "@/domain/project/project";
import { ButtonLink } from "@/ui/components/button-link";
import { Eyebrow } from "@/ui/components/eyebrow";
import { Icon } from "@/ui/components/icon";
import { Reveal } from "@/ui/components/reveal";
import { ProjectCover } from "@/ui/project/project-cover";
import { ProjectCoverTransition } from "@/ui/project/project-cover-transition";
import { TechChips } from "@/ui/project/tech-chips";

type ProjectDetailProps = {
  project: Project;
};

const staggerStep = 0.06;

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="page-container pt-3 pb-8 sm:pt-10 sm:pb-16">
      <Link
        href="/work"
        className="group inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-ink"
      >
        <Icon name="arrow-left" className="size-5 transition-transform group-hover:-translate-x-1" />
        All work
      </Link>
      <Reveal className="mt-4 sm:mt-6">
        <Eyebrow>{projectKindLabel(project.kind).toLowerCase()}</Eyebrow>
        <h1 className="mt-3 text-[2.5rem] leading-none font-semibold tracking-tight text-balance sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-pretty text-muted sm:text-xl">{project.tagline}</p>
      </Reveal>
      <div className="mt-8 sm:mt-10">
        <ProjectCoverTransition projectSlug={project.slug}>
          <div>
            <ProjectCover project={project} isLarge />
          </div>
        </ProjectCoverTransition>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
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
        <p className="text-lg leading-relaxed text-pretty text-ink/90 sm:text-xl">{project.summary}</p>
      </Reveal>
      {project.highlights.length > 0 && (
        <div className="mt-10">
          <Reveal>
            <h2 className="font-mono text-sm text-muted">What I built</h2>
          </Reveal>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((highlight, index) => (
              <li key={highlight}>
                <Reveal delay={index * staggerStep} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                    <Icon name="check" className="size-3.5" />
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
      <Reveal className="space-y-6 rounded-3xl border border-line bg-surface/60 p-6">
        {project.metrics.length > 0 && (
          <dl className="grid grid-cols-2 gap-4">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse">
                <dt className="mt-1 font-mono text-xs text-muted">{metric.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-gradient">{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <dl className="grid gap-3 border-t border-line pt-5 text-sm">
          <Fact label="Role" value={project.role} />
          <Fact label="When" value={project.period} />
        </dl>
        <div className="border-t border-line pt-5">
          <h2 className="font-mono text-xs text-muted">Built with</h2>
          <div className="mt-3">
            <TechChips items={project.stack} />
          </div>
        </div>
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
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
