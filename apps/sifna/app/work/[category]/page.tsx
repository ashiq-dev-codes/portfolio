import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsInCategory } from "@/domain/project/project";
import { categoryRepository, projectRepository } from "@/infrastructure/repositories";
import { PageTransition } from "@/ui/components/page-transition";
import { WorkBrowser } from "@/ui/project/work-browser";

// Static export: every category page is built ahead of time, and unknown ones are a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await categoryRepository.getAll();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[category]">): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categories = await categoryRepository.getAll();
  const category = categories.find((item) => item.slug === categorySlug);
  return { title: category?.title, description: category?.description ?? undefined };
}

export default async function CategoryWorkPage({ params }: PageProps<"/work/[category]">) {
  const { category: categorySlug } = await params;
  const [projects, categories] = await Promise.all([
    projectRepository.getAll(),
    categoryRepository.getAll(),
  ]);
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) notFound();

  return (
    <PageTransition>
      <WorkBrowser
        categories={categories}
        projects={projectsInCategory(projects, category.slug)}
        activeCategory={category}
      />
    </PageTransition>
  );
}
