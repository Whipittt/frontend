import { useRecipeCategoryCache } from "@/hooks/useRecipeCategories";
import type { RecipeCategory } from "@/types";
import { CategoryPill, CategoryPillSkeleton } from "./categoryPill";

type CategorySectionProps = {
  activeCategory: RecipeCategory | "all";
  setActiveCategory: React.Dispatch<React.SetStateAction<RecipeCategory | "all">>;
  onCategoryChange?: () => void;
};

export default function CategorySection({ activeCategory, setActiveCategory, onCategoryChange }: CategorySectionProps) {
  const { data, isError, isLoading } = useRecipeCategoryCache();
  const categories = data ?? [];

  const setActive = (next: RecipeCategory | "all") => {
    setActiveCategory(next);
    onCategoryChange?.();
  };

  return (
    <section id="categories" className="flex flex-col gap-6">
      <h2 className="hidden md:block text-sm md:px-0 px-3">Categories</h2>
      <div
        className="md:pl-0 pl-3 w-full flex gap-2 overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
        aria-busy={isLoading || undefined}
        aria-live={isLoading ? "polite" : undefined}
      >
        {isError && <p className="text-sm text-muted-foreground">Failed to load recipe categories</p>}

        {isLoading && Array.from({ length: 12 }).map((_, i) => <CategoryPillSkeleton key={i} />)}

        {!isError && !isLoading && (
          <>
            <CategoryPill
              label="All"
              onActive={() => setActive("all")}
              variant={activeCategory === "all" ? "active" : "muted"}
            />
            {categories.map((category: RecipeCategory) => (
              <CategoryPill
                key={category.id}
                label={category.name}
                onActive={() => setActive(category)}
                variant={activeCategory !== "all" && activeCategory.id === category.id ? "active" : "muted"}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
