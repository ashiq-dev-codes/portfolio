import { ViewTransition } from "react";
import type { Category } from "@/domain/category/category";
import type { Project } from "@/domain/project/project";
import { SectionHeading } from "@/ui/components/section-heading";
import { CategoryTabs } from "@/ui/category/category-tabs";
import { ProjectGrid } from "@/ui/project/project-grid";

type WorkBrowserProps = {
  categories: Category[];
  /** The projects to show: all of them, or only the active category's. */
  projects: Project[];
  /** Null when showing all work. */
  activeCategory: Category | null;
};

const allWorkText = "Posters, mockups, logos and illustrations: everything in one place.";

export function WorkBrowser({ categories, projects, activeCategory }: WorkBrowserProps) {
  const activeSlug = activeCategory?.slug ?? null;
  const projectLabel = projects.length === 1 ? "project" : "projects";

  return (
    <section className="page-container pt-10 pb-8 sm:pt-16">
      <SectionHeading
        isPageTitle
        eyebrow={`${projects.length} ${projectLabel}`}
        title={activeCategory?.title ?? "All work"}
        text={activeCategory ? activeCategory.description : allWorkText}
      />
      <div className="mt-10">
        <CategoryTabs categories={categories} activeSlug={activeSlug} />
      </div>
      {/* A new key per category makes the grid crossfade when the filter changes. */}
      <ViewTransition key={activeSlug ?? "all"} name="work-grid" share="auto" enter="auto" default="none">
        <div className="mt-10">
          <ProjectGrid projects={projects} />
        </div>
      </ViewTransition>
    </section>
  );
}
