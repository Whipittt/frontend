import { useEffect, useMemo, useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/mainLayout";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import placeholderimage from "@/assets/images/place2.jpg";
import { StarRating, type Rating } from "@/components/ui/star-rating";
import UserAvatar from "@/components/userAvatar";
import FavouriteButton from "@/components/favouriteButton";
import RenderRawHTML from "./renderRawHTML";
import { Button } from "@/components/ui/button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CookTime from "./cookTime";
import BackButton from "@/components/backButton";
import type { Recipe } from "@/types/types";
import { useAuth } from "@/services/authService";
import { RecipeAPI } from "@/api/recipes";
import { Skeleton } from "@/components/ui/skeleton";

type Params = {
  recipe_id: string;
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

export default function Detail(): JSX.Element {
  const { authFetch } = useAuth();
  const { recipe_id } = useParams<Params>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    let isActive = true;

    const run = async () => {
      try {
        if (!recipe_id) {
          setRecipe(null);
          setError("No recipe id provided in URL.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        const data = await RecipeAPI.fetchRecipebyID(authFetch, recipe_id);
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

    run();

    return () => {
      isActive = false;
    };
  }, [authFetch, recipe_id]);

  const descriptionHtml = useMemo<string>(
    () =>
      recipe?.description
        ? recipe.description
        : "<p>No description provided.</p>",
    [recipe?.description]
  );

  const instructionsHtml = useMemo<string>(
    () =>
      recipe?.instructions
        ? recipe.instructions
        : "<p>No instructions provided.</p>",
    [recipe?.instructions]
  );

  return (
    <MainLayout>
      <section className="flex gap-4 justify-between items-center">
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

          <AspectRatio ratio={21 / 9} className="relative">
            <Skeleton className="absolute inset-0 h-full w-full rounded-md" />
          </AspectRatio>

          <IngredientsSkeleton />
          <SectionSkeleton titleWidth="w-40" lines={5} />
          <SectionSkeleton titleWidth="w-44" lines={6} />
        </section>
      )}

      {!loading && error && (
        <div className="py-12 text-center text-destructive">{error}</div>
      )}

      {!loading && !error && recipe && (
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center flex-wrap">
                <h1 className="text-xl font-medium">{recipe.title}</h1>
                <FavouriteButton
                  state={recipe.favourited ? "filled" : "outline"}
                  aria-label={
                    recipe.favourited
                      ? "Remove from favourites"
                      : "Add to favourites"
                  }
                />
              </div>
              <StarRating
                rating={Number(recipe.rating ?? 0) as unknown as Rating}
              />
            </div>
            <CookTime time={Number(recipe.time_minutes ?? 0)} />
          </div>

          <AspectRatio ratio={21 / 9} className="relative">
            <img
              src={
                imgError
                  ? placeholderimage
                  : recipe.display_image || placeholderimage
              }
              alt={recipe.title || "Recipe image"}
              className="h-full w-full object-cover brightness-[0.85]"
              onError={() => setImgError(true)}
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <Button
              variant="ghost"
              className="absolute bottom-2 left-2 text-white hover:bg-white/20"
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
                variant="ghost"
                className="text-primary text-sm"
                disabled={!recipe.ingredients?.length}
                aria-disabled={!recipe.ingredients?.length}
              >
                Get Shopping List
              </Button>
            </div>

            <div>
              {recipe.ingredients?.length ? (
                <ul className="list-disc list-inside leading-relaxed">
                  {recipe.ingredients.map((ing) => (
                    <li key={(ing as any).id ?? ing.name}>{ing.name}</li>
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
    </MainLayout>
  );
}
