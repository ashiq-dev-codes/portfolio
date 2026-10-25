import type { Category } from "@/domain/category/category";

export interface CategoryRepository {
  /** All categories, in display order. */
  getAll(): Promise<Category[]>;
}
