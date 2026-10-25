import Link from "next/link";
import type { Project } from "@/domain/project/project";
import { ArtworkImage } from "@/ui/components/artwork-image";
import { Reveal } from "@/ui/components/reveal";

type ProjectCollageProps = {
  /** Up to three projects; portrait covers fit best. */
  projects: Project[];
};

const cardPlacements = [
  "left-0 top-[14%] w-[48%] -rotate-6",
  "right-0 top-0 w-[46%] rotate-4",
  "left-[27%] bottom-0 w-[46%] -rotate-1",
];
const floatDelays = ["0s", "-2.3s", "-4.6s"];
const entranceStep = 0.15;

export function ProjectCollage({ projects }: ProjectCollageProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
      {projects.slice(0, cardPlacements.length).map((project, index) => (
        <Reveal
          key={project.slug}
          delay={0.2 + index * entranceStep}
          className={`absolute hover:z-10 ${cardPlacements[index]}`}
        >
          <div className="animate-float motion-reduce:animate-none" style={{ animationDelay: floatDelays[index] }}>
            <Link
              href={`/projects/${project.slug}`}
              className="block aspect-3/4 overflow-hidden rounded-2xl border-4 border-surface bg-surface shadow-lift transition duration-300 hover:scale-105 hover:rotate-0"
            >
              <ArtworkImage
                image={project.cover}
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="size-full object-cover"
                isPriority={index === 0}
              />
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
