import { RecipeCardSm, RecipeCardSmSkeleton } from "@/components/recipeCard";
import HomeSectionLayout from "./homeSectionLayout";
import { useUserRecipeRecommendationsCache } from "@/hooks/useRecipes";
import type { RecipeBrief } from "@/types";

export default function RecommendationSection() {
  const { data, error, isLoading } = useUserRecipeRecommendationsCache();

  if (error) {
    return (
      <HomeSectionLayout header="Recommended for you">
        <p className="text-center">Failed to fetch recommendations</p>
      </HomeSectionLayout>
    );
  }

  return (
    <HomeSectionLayout header="Recommended for you">
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
