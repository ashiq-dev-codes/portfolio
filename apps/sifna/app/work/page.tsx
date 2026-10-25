import type { Metadata } from "next";
import { categoryRepository, projectRepository } from "@/infrastructure/repositories";
import { PageTransition } from "@/ui/components/page-transition";
import { WorkBrowser } from "@/ui/project/work-browser";

export const metadata: Metadata = {
  title: "Work",
};

export default async function WorkPage() {
  const [projects, categories] = await Promise.all([
    projectRepository.getAll(),
    categoryRepository.getAll(),
  ]);

  return (
    <PageTransition>
      <WorkBrowser categories={categories} projects={projects} activeCategory={null} />
    </PageTransition>
  );
}
