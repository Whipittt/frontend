import { useCategories } from "@/hooks/useCategories";
import type { RecipeCategory } from "@/types/types";
import { CategoryPill, CategoryPillSkeleton } from "./categoryPill";

export default function CategorySection() {
  const { data, isError, isLoading } = useCategories();

  if (isError) {
    return (
      <section id="categories" className="flex flex-col gap-6">
        <h2 className="text-sm md:px-0 px-4">Categories</h2>

        <div className="md:pl-0 pl-4 w-full flex gap-2 overflow-x-scroll snap-x snap-mandatory hide-scrollbar">
          <p className="text-sm text-muted-foreground">
            Failed to load recipe categories
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section id="categories" className="flex flex-col gap-6">
        <h2 className="text-sm md:px-0 px-4">Categories</h2>

        <div
          className="md:pl-0 pl-4 w-full flex gap-2 overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
          aria-busy="true"
          aria-live="polite"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <CategoryPillSkeleton key={i} widthClass="w-20" />
          ))}
        </div>
      </section>
    );
  }

  const categories = data ?? [];

  return (
    <section id="categories" className="flex flex-col gap-6">
      <h2 className="text-sm md:px-0 px-4">Categories</h2>

      <div className="md:pl-0 pl-4 w-full flex gap-2 overflow-x-scroll snap-x snap-mandatory hide-scrollbar">
        <CategoryPill to="/" label="All" variant="active" />

        {categories.map((category: RecipeCategory) => (
          <CategoryPill
            key={category.id}
            to="/"
            label={category.name}
            variant="muted"
          />
        ))}
      </div>
    </section>
  );
}
