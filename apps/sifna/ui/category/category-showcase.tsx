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

export function CategoryShowcase({ previews }: CategoryShowcaseProps) {
  const filledPreviews = previews.filter((preview) => preview.projects.length > 0);
  if (filledPreviews.length === 0) return null;

  return (
    <section className="page-container py-20">
      <SectionHeading eyebrow="What I design" title="From bold posters to brands that last" />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6">
        {filledPreviews.map((preview, index) => (
          <li key={preview.category.slug}>
            <Reveal delay={(index % 2) * staggerStep}>
              <CategoryCard category={preview.category} projects={preview.projects} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
