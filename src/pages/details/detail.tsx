import { useEffect, useState, useCallback, useMemo } from "react";
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

export default function Detail() {
  const { authFetch } = useAuth()
  const { recipe_id } = useParams(); 
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecipe = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await RecipeAPI.fetchRecipebyID(authFetch, recipe_id || "");
      if (!data) {
        setError("Recipe not found.");
      }
      setRecipe(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load recipe.");
    } finally {
      setLoading(false);
    }
  }, [recipe_id]);

  useEffect(() => {
    if (recipe_id) {
      loadRecipe();
    } else {
      setLoading(false);
      setError("No recipe id provided in URL.");
    }
  }, [recipe_id, loadRecipe]);

  const descriptionHtml = useMemo(
    () => recipe?.description || "<p>No description provided.</p>",
    [recipe?.description]
  );
  const instructionsHtml = useMemo(
    () => recipe?.instructions || "<p>No instructions provided.</p>",
    [recipe?.instructions]
  );

  return (
    <MainLayout>
      <section className="flex gap-4 justify-between items-center">
        <BackButton />
        <UserAvatar />
      </section>

      {loading && (
        <div className="py-12 text-center text-muted-foreground">
          Loading recipe...
        </div>
      )}

      {!loading && error && <div className="py-12 text-center">{error}</div>}

      {!loading && !error && recipe && (
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center flex-wrap">
                <h1 className="text-xl font-medium">{recipe.title}</h1>
                <FavouriteButton
                  state={recipe.favourited ? "filled" : "outline"}
                />
                {/* {recipe.favourites_count != null && (
                  <span className="text-xs text-muted-foreground">
                    {recipe.favourites_count} favourites
                  </span>
                )} */}
              </div>
              <StarRating rating={recipe.rating ?? 0} />
            </div>
            <CookTime time={recipe.time_minutes ?? 0} />
          </div>

          <AspectRatio ratio={21 / 9} className="relative">
            <img
              src={recipe.display_image || placeholderimage}
              alt={recipe.title}
              className="h-full w-full object-cover brightness-[0.85]"
            />
            <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <Button
              variant="ghost"
              className="absolute bottom-2 left-2 text-white hover:bg-white/20"
            >
              <AddRoundedIcon />
              Add to meal plan
            </Button>
          </AspectRatio>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Ingredients</h2>
              <Button variant="ghost" className="text-primary text-sm">
                Get Shopping List
              </Button>
            </div>

            <div>
              {recipe.ingredients?.length ? (
                <ul className="list-disc list-inside leading-relaxed">
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.id}>{ing.name}</li>
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
