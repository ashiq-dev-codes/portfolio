export type Category = {
  slug: string;
  title: string;
  description: string | null;
  order: number;
};

export function sortCategories(categories: Category[]): Category[] {
  return [...categories].sort((first, second) => first.order - second.order);
}
