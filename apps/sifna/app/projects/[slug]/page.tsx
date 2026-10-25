import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findProject, projectNeighbours, projectsInCategory } from "@/domain/project/project";
import { projectRepository } from "@/infrastructure/repositories";
import { PageTransition } from "@/ui/components/page-transition";
import { ProjectDetail } from "@/ui/project/project-detail";
import { ProjectPager } from "@/ui/project/project-pager";

// Static export: every project page is built ahead of time, and unknown ones are a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await projectRepository.getAll();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(await projectRepository.getAll(), slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description ?? `${project.title}, ${project.category.title.toLowerCase()} design.`,
    openGraph: { images: [{ url: project.cover.url, alt: project.cover.alt }] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const projects = await projectRepository.getAll();
  const project = findProject(projects, slug);
  if (!project) notFound();

  const neighbours = projectNeighbours(projectsInCategory(projects, project.category.slug), slug);

  return (
    <PageTransition>
      <ProjectDetail project={project} />
      {neighbours && <ProjectPager neighbours={neighbours} />}
    </PageTransition>
  );
}
