import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/layouts/mainLayout";
import { RecipeCardSm, RecipeCardSmSkeleton } from "@/components/recipeCard";
import { useAuth } from "@/services/authService";
import { RecipeAPI } from "@/api/recipes";
import type { RecipeBrief } from "@/types";
import PageHeader from "@/components/pageHeader";
import { RecipeCommand } from "@/components/recipeCommand";
import HorizontalScroll from "@/components/horizontalScroll";

export default function SearchResults() {
  const { authFetch } = useAuth();
  const [searchParams] = useSearchParams();

  const ingredients = useMemo(() => {
    const list = searchParams
      .getAll("ingredient")
      .map((v) => v.trim())
      .filter(Boolean);
    return Array.from(new Set(list));
  }, [searchParams]);

  const [recipes, setRecipes] = useState<RecipeBrief[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (ingredients.length === 0) {
        setRecipes([]);
        setFetchError("");
        return;
      }

      setLoading(true);
      setFetchError("");

      try {
        const data = await RecipeAPI.filterRecipesByIngredient(
          authFetch,
          ingredients
        );
        if (!cancelled) {
          setRecipes(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          let message = "Something went wrong fetching recipes.";
          if (err instanceof Error) {
            message = err.message;
          } else if (typeof err === "string") {
            message = err;
          } else if (
            err &&
            typeof err === "object" &&
            "message" in err &&
            typeof (err as any).message === "string"
          ) {
            message = (err as any).message;
          }
          setFetchError(message);
          setRecipes([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [authFetch, ingredients]);

  const titlePrefix =
    ingredients.length > 0
      ? `Recipes with ${ingredients.join(", ")}`
      : "Search Results";

  const description = `Showing results for recipes that contain(s) ${
    ingredients.length > 0 ? `${ingredients.join(", ")}` : "--"
  }`;

  return (
    <>
      <MainLayout pageTitle={titlePrefix}>
        <PageHeader text="Search Results" />

        <section>
          <RecipeCommand />
        </section>

        <section className="flex flex-col gap-6 mt-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-lg md:text-base capitalize">
              Top results
            </h2>
            <span className="text-sm md:max-w-[70%]">{description}</span>
          </div>

          <HorizontalScroll className="p-0">
            {loading ? (
              <>
                {Array.from({ length: 12 }).map((_, i) => (
                  <RecipeCardSmSkeleton key={i} />
                ))}
              </>
            ) : fetchError ? (
              <section className="py-6">
                <p className="text-destructive">{fetchError}</p>
              </section>
            ) : ingredients.length === 0 ? (
              <section className="py-6">
                <p className="text-gray-600">
                  Provide at least one ingredient to search.
                </p>
              </section>
            ) : recipes.length === 0 ? (
              <section className="py-6">
                <p className="text-gray-600">
                  Sorry we couldnt find any recipe with the provided ingredien
                </p>
              </section>
            ) : (
              <>
                {recipes.map((recipe: RecipeBrief) => (
                  <RecipeCardSm key={recipe.id} recipe={recipe} />
                ))}
              </>
            )}
          </HorizontalScroll>
        </section>
      </MainLayout>
    </>
  );
}
