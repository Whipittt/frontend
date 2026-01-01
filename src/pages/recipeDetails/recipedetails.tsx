import { useCallback, useEffect, useMemo, useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/mainLayout";
import placeholderimage from "@/assets/images/place2.jpg";
import { StarRating, type Rating } from "@/components/ui/star-rating";
import UserAvatar from "@/components/userAvatar";
import FavouriteButton from "@/components/favouriteButton";
import RenderRawHTML from "./renderRawHTML";
import { Button } from "@/components/ui/button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CookTime from "./cookTime";
import BackButton from "@/components/backButton";
import type { Recipe } from "@/types";
import { useAuth } from "@/services/authService";
import { RecipeAPI } from "@/api/recipes";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavouriteRecipesCache } from "@/hooks/useRecipeData";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";
import { ShoppingListPopup } from "@/components/shoppingListPopup";

type Params = {
  recipe_id: string;
};

type Ingredient = {
  id?: string | number;
  name: string;
};

function IngredientsSkeleton(): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-32" />
      </div>
      <ul className="list-disc list-inside space-y-2">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-4 w-40" />
      </ul>
    </div>
  );
}

function SectionSkeleton(props: {
  titleWidth?: string;
  lines?: number;
}): JSX.Element {
  const { titleWidth = "w-48", lines = 4 } = props;
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className={`h-6 ${titleWidth}`} />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function RecipeDetails(): JSX.Element {
  const { isAuthenticated, authFetch } = useAuth();
  const { recipe_id } = useParams<Params>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true);
  const [imgError, setImgError] = useState<boolean>(false);

  // Favourite toggle specific state
  const [favouriteLoading, setFavouriteLoading] = useState<boolean>(false);
  const [favouriteError, setFavouriteError] = useState<string | null>(null);
  const { refetch: refreshFavouritesCache } = useFavouriteRecipesCache();

  // Fetch recipe
  useEffect(() => {
    let isActive = true;

    const fetchRecipe = async () => {
      try {
        if (!recipe_id) {
          setRecipe(null);
          setError("No Recipe ID provided in URL.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        const data = isAuthenticated
          ? await RecipeAPI.fetchWithFavouriteStatus(authFetch, recipe_id)
          : await RecipeAPI.fetchByID(recipe_id);
        if (!isActive) return;

        if (!data) {
          setRecipe(null);
          setError("Recipe not found.");
        } else {
          setRecipe(data);
        }
      } catch (e: unknown) {
        if (!isActive) return;
        const message =
          e instanceof Error ? e.message : "Failed to load recipe.";
        setRecipe(null);
        setError(message);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchRecipe();
    return () => {
      isActive = false;
    };
  }, [isAuthenticated, authFetch, recipe_id]);

  // Derived HTML
  const descriptionHtml = recipe?.description
    ? recipe.description
    : "<p>No description provided.</p>";
  const instructionsHtml = recipe?.instructions
    ? recipe.instructions
    : "<p>No instructions provided.</p>";

  // Toggle favourite (optimistic update)
  const handleToggleFavourite = useCallback(async () => {
    if (!recipe || favouriteLoading || !isAuthenticated) return;

    setFavouriteError(null);
    setFavouriteLoading(true);

    const previous = recipe.favourited;
    // Optimistic UI
    setRecipe((r) => (r ? { ...r, favourited: !r.favourited } : r));

    try {
      const updated = await RecipeAPI.toggleFavourite(authFetch, recipe.id);
      setRecipe(updated);
      refreshFavouritesCache();
    } catch (e: unknown) {
      setRecipe((r) => (r ? { ...r, favourited: previous } : r));
      const message =
        e instanceof Error ? e.message : "Failed to toggle favourite.";
      setFavouriteError(message);
    } finally {
      setFavouriteLoading(false);
    }
  }, [
    isAuthenticated,
    authFetch,
    recipe,
    favouriteLoading,
    refreshFavouritesCache,
  ]);

  // Safe rating conversion (clamped to expected range if Rating is constrained)
  const rating: Rating = useMemo(() => {
    const r = Number(recipe?.rating ?? 0);
    return Math.max(0, Math.min(5, r)) as Rating;
  }, [recipe?.rating]);

  const timeMinutes = Number(recipe?.time_minutes ?? 0);

  const [open, setOpen] = useState(false);

  return (
    <MainLayout className="px-3">
      <section className="hidden md:flex gap-4 justify-between items-center">
        <BackButton />
        <UserAvatar />
      </section>

      {loading && (
        <section
          className="flex flex-col gap-8 py-2"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-7 w-56" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-28" />
              </div>
            </div>
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="relative aspect-[16/9]">
            <Skeleton className="absolute inset-0 h-full w-full rounded-md" />
          </div>

          <IngredientsSkeleton />
          <SectionSkeleton titleWidth="w-40" lines={5} />
          <SectionSkeleton titleWidth="w-44" lines={6} />
        </section>
      )}

      {!loading && error && (
        <div className="py-12 text-center text-destructive" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && recipe && (
        <section className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-medium">{recipe.title}</h1>
                {isAuthenticated && (
                  <FavouriteButton
                    state={recipe.favourited ? "filled" : "outline"}
                    onClick={handleToggleFavourite}
                    aria-label={
                      recipe.favourited
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    aria-pressed={recipe.favourited}
                    className="order-2 md:order-none"
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <StarRating rating={rating} />
                <div className="block md:hidden">
                  <CookTime time={timeMinutes} />
                </div>
                {favouriteError && (
                  <p className="text-xs text-destructive" role="alert">
                    {favouriteError}
                  </p>
                )}
              </div>
            </div>

            <div className="hidden md:block">
              <CookTime time={timeMinutes} />
            </div>
          </div>

          <AspectRatio ratio={16 / 10} className="relative">
            <img
              src={
                imgError
                  ? placeholderimage
                  : recipe.display_image || placeholderimage
              }
              onLoad={() => setImgIsLoading(false)}
              alt={recipe.title || "Recipe image"}
              className={cn(
                "h-full w-full object-cover brightness-[0.85]",
                !imgIsLoading ? "opacity-100 blur-0" : "opacity-0 blur-md"
              )}
              onError={() => setImgError(true)}
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <Button
              variant="zombie"
              className="absolute bottom-2 left-4 text-white"
              aria-label="Add to meal plan"
            >
              <AddRoundedIcon />
              Add to meal plan
            </Button>
          </AspectRatio>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Ingredients</h2>
              <Button
                variant="zombie"
                className="text-primary hover:text-primary/80 "
                disabled={!recipe.ingredients?.length}
                aria-disabled={!recipe.ingredients?.length}
                onClick={() => setOpen((prev) => !prev)}
              >
                Get Shopping List
              </Button>
            </div>

            <div>
              {recipe.ingredients?.length ? (
                <ul className="list-disc list-inside leading-relaxed">
                  {recipe.ingredients.map((ing: Ingredient) => (
                    <li key={ing.id ?? ing.name}>{ing.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No ingredients listed.
                </p>
              )}
            </div>
          </div>

          <RenderRawHTML header="Description" content={descriptionHtml} />
          <RenderRawHTML header="Instructions" content={instructionsHtml} />
        </section>
      )}

      {!loading && !error && !recipe && (
        <div className="py-12 text-center text-muted-foreground">
          No recipe data.
        </div>
      )}

      <ShoppingListPopup
        open={open}
        onOpenChange={setOpen}
        recipeTitle={recipe?.title ?? ""}
        ingredients={
          recipe && recipe.ingredients
            ? recipe.ingredients.map((ing: Ingredient) => ing.name)
            : []
        }
      />
    </MainLayout>
  );
}
