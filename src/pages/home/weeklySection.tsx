import { RecipeCardSm, RecipeCardSmSkeleton } from "@/components/recipeCard";
import HomeSectionLayout from "./homeSectionLayout";
import { useRecipesOfTheWeek } from "@/hooks/useRecipes";
import type { RecipeBrief } from "@/types/types";

export default function WeeklySection() {
  const { data, error, isLoading } = useRecipesOfTheWeek();

  if (error) {
    return (
      <HomeSectionLayout header="Recipes of the week">
        <p className="text-center">Failed to fetch recipes of the week</p>
      </HomeSectionLayout>
    );
  }
  return (
    <HomeSectionLayout header="Recipes of the week">
      <div className="flex gap-4" aria-busy={isLoading} aria-live="polite">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <RecipeCardSmSkeleton key={i} />
            ))
          : data?.map((recipe: RecipeBrief) => (
              <RecipeCardSm key={recipe.id} recipe={recipe} />
            ))}
      </div>
    </HomeSectionLayout>
  );
}
