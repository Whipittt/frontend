import { useRecipeCategoryCache } from "@/hooks/useRecipeCategories";
import type { RecipeCategory } from "@/types";
import { CategoryPill, CategoryPillSkeleton } from "./categoryPill";

type CategorySectionProps = {
  activeCategory: RecipeCategory | "all";
  setActiveCategory: React.Dispatch<
    React.SetStateAction<RecipeCategory | "all">
  >;
  onCategoryChange?: () => void;
};

export default function CategorySection({
  activeCategory,
  setActiveCategory,
  onCategoryChange: onChange,
}: CategorySectionProps) {
  const { data, isError, isLoading } = useRecipeCategoryCache();

  if (isError) {
    return (
      <section id="categories" className="flex flex-col gap-6">
        <h2 className="text-sm md:px-0 px-4 hidden md:block">Categories</h2>

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
            <CategoryPillSkeleton key={i} />
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
        <CategoryPill
          label="All"
          onActive={() => {
            setActiveCategory("all");
            onChange?.();
          }}
          variant={activeCategory === "all" ? "active" : "muted"}
        />

        {categories.map((category: RecipeCategory) => (
          <CategoryPill
            key={category.id}
            label={category.name}
            onActive={() => {
              setActiveCategory(category);
              onChange?.();
            }}
            variant={activeCategory === category ? "active" : "muted"}
          />
        ))}
      </div>
    </section>
  );
}
