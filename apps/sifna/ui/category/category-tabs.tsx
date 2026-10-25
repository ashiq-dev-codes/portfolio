import { ViewTransition } from "react";
import Link from "next/link";
import type { Category } from "@/domain/category/category";
import { quietTransitionType } from "@/ui/components/page-transition";

type CategoryTabsProps = {
  categories: Category[];
  /** Null when "All" is selected. */
  activeSlug: string | null;
};

export function CategoryTabs({ categories, activeSlug }: CategoryTabsProps) {
  return (
    <nav
      aria-label="Categories"
      className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0"
    >
      <ul className="flex w-max gap-2 rounded-full border border-line bg-surface p-1.5 shadow-card">
        <li>
          <CategoryTab href="/work" label="All" isActive={activeSlug === null} />
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <CategoryTab
              href={`/work/${category.slug}`}
              label={category.title}
              isActive={category.slug === activeSlug}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

type CategoryTabProps = {
  href: string;
  label: string;
  isActive: boolean;
};

// The active pill has one shared transition name, so it glides from the old tab to the new one.
function CategoryTab({ href, label, isActive }: CategoryTabProps) {
  return (
    <Link
      href={href}
      scroll={false}
      transitionTypes={[quietTransitionType]}
      aria-current={isActive ? "page" : undefined}
      className="relative inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium transition-colors hover:bg-paper active:scale-95"
    >
      {isActive && (
        <ViewTransition name="active-category" share="morph" default="none">
          <span className="absolute inset-0 rounded-full bg-ink" />
        </ViewTransition>
      )}
      <span className={`relative ${isActive ? "text-surface" : "text-ink"}`}>{label}</span>
    </Link>
  );
}
