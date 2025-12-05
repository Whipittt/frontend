import HomeSectionLayout from "./homeSectionLayout";
import { RecipeCardSm, RecipeCardSmSkeleton } from "@/components/recipeCard";
import { useCategorizedRecipesCache as useCategorizedRecipesCache } from "@/hooks/useRecipes";
import type { RecipeBrief, RecipeCategory } from "@/types";

export default function ActiveCategorySection({
  category,
}: {
  category: RecipeCategory;
}) {
  const { data, error, isLoading } = useCategorizedRecipesCache(category.name);

  return (
    <HomeSectionLayout
      header={`${category.name} recipes`}
      description={category.description}
      scrollBehaviour="horizontal"
    >
      {error && (
        <p className="col-span-full my-4 text-destructive text-center">{`Failed to fetch recipes under ${category.name} category`}</p>
      )}

      {!data ||
        (data.length == 0 && (
          <p className="col-span-full my-4 text-center">
            {`There are no ${category.name.toLowerCase()} recipes yet.`}
          </p>
        ))}

      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <RecipeCardSmSkeleton key={i} />
          ))
        : data?.map((recipe: RecipeBrief) => (
            <RecipeCardSm key={recipe.id} recipe={recipe} />
          ))}
    </HomeSectionLayout>
  );
}
