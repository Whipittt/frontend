import { RecipeCardLg, RecipeCardLgSkeleton } from "@/components/recipeCard";
import HomeSectionLayout from "./homeSectionLayout";
import { useLocalFavourites } from "@/hooks/useRecipes";
import type { RecipeBrief } from "@/types/types";

export default function DiscoverySection() {
  const { data, error, isLoading } = useLocalFavourites();

  if (error) {
    return (
      <HomeSectionLayout header="Discover Local Favorites">
        <p>Failed to fetch local favourites</p>
      </HomeSectionLayout>
    );
  }

  return (
    <HomeSectionLayout header="Discover Local Favorites">
      <div className="flex gap-4" aria-busy={isLoading} aria-live="polite">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <RecipeCardLgSkeleton key={i} />
            ))
          : data?.map((recipe: RecipeBrief) => (
              <RecipeCardLg key={recipe.id} recipe={recipe} />
            ))}
      </div>
    </HomeSectionLayout>
  );
}
