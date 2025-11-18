import { RecipeCardSm } from "@/components/recipeCard";
import HomeSectionLayout from "./homeSectionLayout";
import { useRecommendations } from "@/hooks/useRecipes";
import type { RecipeBrief } from "@/types/types";

export default function RecommendationSection() {
  const { data, error } = useRecommendations();

  if (error) {
    return (
      <HomeSectionLayout header="Recommended for you">
        <p>Failed to fetch recommendations</p>
      </HomeSectionLayout>
    );
  }

  return (
    <HomeSectionLayout header="Recommended for you">
      {data?.map((recipe: RecipeBrief) => (
        <RecipeCardSm key={recipe.id} recipe={recipe} />
      ))}
    </HomeSectionLayout>
  );
}
