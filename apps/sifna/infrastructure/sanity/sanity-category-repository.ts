import { cache } from "react";
import { sortCategories, type Category } from "@/domain/category/category";
import type { CategoryRepository } from "@/domain/category/category-repository";
import { categoryProjection, mapCategory, type RawCategory } from "@/infrastructure/sanity/category-mapper";
import { sanityClient } from "@/infrastructure/sanity/sanity-client";

const categoriesQuery = `*[_type == "category"]${categoryProjection}`;

export class SanityCategoryRepository implements CategoryRepository {
  // cache() shares one fetch between the metadata and page of the same render.
  getAll = cache(async (): Promise<Category[]> => {
    const rawCategories = await sanityClient.fetch<RawCategory[]>(categoriesQuery);
    const categories = rawCategories
      .map(mapCategory)
      .filter((category): category is Category => category !== null);
    return sortCategories(categories);
  });
}
