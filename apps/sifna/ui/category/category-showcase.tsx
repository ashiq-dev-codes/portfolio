import type { Category } from "@/domain/category/category";
import type { Project } from "@/domain/project/project";
import { Reveal } from "@/ui/components/reveal";
import { SectionHeading } from "@/ui/components/section-heading";
import { CategoryCard } from "@/ui/category/category-card";

export type CategoryPreview = {
  category: Category;
  projects: Project[];
};

type CategoryShowcaseProps = {
  previews: CategoryPreview[];
};

const staggerStep = 0.1;

// Phones get a swipeable row (the next card peeks in to invite a swipe); tablets and up a grid.
export function CategoryShowcase({ previews }: CategoryShowcaseProps) {
  const filledPreviews = previews.filter((preview) => preview.projects.length > 0);
  if (filledPreviews.length === 0) return null;

  return (
    <section className="page-container py-14 sm:py-20">
      <SectionHeading eyebrow="What I design" title="From bold posters to brands that last" />
      <ul className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
        {filledPreviews.map((preview, index) => (
          <li key={preview.category.slug} className="w-[82%] shrink-0 snap-start sm:w-auto">
            <Reveal delay={(index % 2) * staggerStep}>
              <CategoryCard category={preview.category} projects={preview.projects} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
