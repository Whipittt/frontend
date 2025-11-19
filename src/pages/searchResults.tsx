import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/layouts/mainLayout";
import { Helmet } from "react-helmet-async";
import { RecipeCardSm, RecipeCardSmSkeleton } from "@/components/recipeCard";
import { useAuth } from "@/services/authService";
import { RecipeAPI } from "@/api/recipes";
import type { RecipeBrief } from "@/types/types";

const APP_NAME = import.meta.env.VITE_APP_NAME;

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
        const data = await RecipeAPI.searcRecipesByIngredient(
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
          } else if (err && typeof err === "object" && "message" in err && typeof (err as any).message === "string") {
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

  return (
    <>
      <Helmet>
        <title>{`${titlePrefix} - ${APP_NAME}`}</title>
      </Helmet>

      <MainLayout className="px-2 md:px-8">
        <section className="mb-4 md:mb-8">
          <h1 className="font-serif text-2xl md:text-5xl">Search Results</h1>

          {/* <div className="mt-3 flex flex-wrap items-center gap-2">
            {ingredients.length > 0 ? (
              <>
                <span className="text-sm md:text-base text-gray-600">
                  Ingredients:
                </span>
                {ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs md:text-sm text-gray-800 border"
                  >
                    {ing}
                  </span>
                ))}
              </>
            ) : (
              <span className="text-sm md:text-base text-gray-600">
                Add ingredients using the URL, for example:
                /recipes/ingredients?ingredient=rice&ingredient=tomatoe
              </span>
            )}
          </div> */}

          {/* {ingredients.length > 0 && !loading && !fetchError && (
            <p className="mt-2 text-sm text-gray-500">
              {recipes.length} result{recipes.length === 1 ? "" : "s"}
            </p>
          )} */}
        </section>

        {loading ? (
          <section className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <RecipeCardSmSkeleton key={i} />
            ))}
          </section>
        ) : fetchError ? (
          <section className="py-6">
            <p className="text-red-600">{fetchError}</p>
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
          <section className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-6">
            {recipes.map((recipe: RecipeBrief) => (
              <RecipeCardSm key={recipe.id} recipe={recipe} />
            ))}
          </section>
        )}
      </MainLayout>
    </>
  );
}
