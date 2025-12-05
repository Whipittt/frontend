import { RecipeCardSm, RecipeCardSmSkeleton } from "@/components/recipeCard";
import HomeSectionLayout from "./homeSectionLayout";
import { useRecipeRecommendationsCache } from "@/hooks/useRecipes";
import type { RecipeBrief } from "@/types";

export default function RecommendationSectionUnauthenticated() {
  const { data, error, isLoading } = useRecipeRecommendationsCache();

  return (
    <HomeSectionLayout
      scrollBehaviour="horizontal"
      header="Recommended Recipes"
    >
      {isLoading ? (
        Array.from({ length: 8 }).map((_, i) => (
          <RecipeCardSmSkeleton key={i} />
        ))
      ) : !error ? (
        data?.map((recipe: RecipeBrief) => (
          <RecipeCardSm key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <p className="text-center">Failed to fetch recommendationccs</p>
      )}
    </HomeSectionLayout>
  );
}
