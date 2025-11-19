import MainLayout from "@/layouts/mainLayout";
import { Helmet } from "react-helmet-async";
import FavouriteRecipeCard, {
  FavouriteRecipeCardSkeleton,
} from "./favouriteRecipeCard";
import UserAvatar from "@/components/userAvatar";
import { useFavourites } from "@/hooks/useRecipes";
import type { RecipeBrief } from "@/types/types";
import { useAuth } from "@/services/authService";
import { RecipeAPI } from "@/api/recipes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, type JSX } from "react";

const APP_NAME = import.meta.env.VITE_APP_NAME;

const FAVOURITES_QUERY_KEY = ["favourites"];

export default function Favourites(): JSX.Element {
  const queryClient = useQueryClient();
  const { authFetch } = useAuth();

  const { data: favourites, error, isLoading, isFetching } = useFavourites();

  const toggleFavouriteMutation = useMutation({
    mutationFn: async (recipeId: string ) =>
      RecipeAPI.toggleFavourite(authFetch, recipeId),
    onMutate: async (recipeId: string ) => {
      await queryClient.cancelQueries({ queryKey: FAVOURITES_QUERY_KEY });

      const previous =
        queryClient.getQueryData<RecipeBrief[]>(FAVOURITES_QUERY_KEY);

      // Optimistically remove the recipe from the list
      queryClient.setQueryData<RecipeBrief[]>(
        FAVOURITES_QUERY_KEY,
        (old) => old?.filter((r) => r.id !== recipeId) ?? []
      );

      return { previous };
    },
    onError: (_err, _recipeId, context) => {
      // Revert to previous cache on error
      if (context?.previous) {
        queryClient.setQueryData(FAVOURITES_QUERY_KEY, context.previous);
      }
    },
    onSuccess: (updatedRecipe: any) => {
      // If the backend toggled it back to favourited (edge case),
      // reinsert the recipe (prepend to list).
      if (updatedRecipe?.favourited) {
        queryClient.setQueryData<RecipeBrief[]>(FAVOURITES_QUERY_KEY, (old) =>
          old
            ? [{ ...(updatedRecipe as RecipeBrief) }, ...old]
            : [{ ...(updatedRecipe as RecipeBrief) }]
        );
      }
    },
    onSettled: () => {
      // Ensure consistency by refetching
      queryClient.invalidateQueries({ queryKey: FAVOURITES_QUERY_KEY });
    },
  });

  const handleRemove = useCallback(
    (recipeId: string ) => {
      if (toggleFavouriteMutation.isPending) return;  
      toggleFavouriteMutation.mutate(recipeId);
    },
    [toggleFavouriteMutation]
  );

  const mutationError = toggleFavouriteMutation.isError
    ? (toggleFavouriteMutation.error as Error)?.message ||
      "Failed to update favourites."
    : null;

  const isEmpty = useMemo(
    () => Array.isArray(favourites) && favourites.length === 0,
    [favourites]
  );

  if (error) {
    return (
      <MainLayout className="px-2 md:px-8 gap-12">
        <section>
          <div className="flex gap-4 justify-between items-center">
            <h1 className="font-serif text-2xl md:text-5xl">Your Favourites</h1>
            <UserAvatar />
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <p className="text-center text-destructive">
            Failed to fetch favourites.
          </p>
        </section>
      </MainLayout>
    );
  }

  if (isLoading) {
    return (
      <MainLayout className="px-2 md:px-8 gap-12">
        <section>
          <div className="flex gap-4 justify-between items-center">
            <h1 className="font-serif text-2xl md:text-5xl">Your Favourites</h1>
            <UserAvatar />
          </div>
        </section>
        <section
          className="flex flex-col gap-8"
          aria-busy="true"
          aria-live="polite"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <FavouriteRecipeCardSkeleton key={i} />
          ))}
        </section>
      </MainLayout>
    );
  }

  if (isEmpty) {
    return (
      <MainLayout className="px-2 md:px-8 gap-12">
        <section>
          <div className="flex gap-4 justify-between items-center">
            <h1 className="font-serif text-2xl md:text-5xl">Your Favourites</h1>
            <UserAvatar />
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <p className="text-center">You have no favourite recipes yet.</p>
        </section>
      </MainLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`My Favourites - ${APP_NAME}`}</title>
      </Helmet>
      <MainLayout className="px-2 md:px-8 gap-12">
        <section>
          <div className="flex gap-4 justify-between items-center">
            <h1 className="font-serif text-2xl md:text-5xl">Your Favourites</h1>
            <UserAvatar />
          </div>
        </section>

        {mutationError && (
          <div className="text-center text-xs text-destructive" role="alert">
            {mutationError}
          </div>
        )}

        <section
          className="flex flex-col gap-8"
          aria-busy={toggleFavouriteMutation.isPending || isFetching}
        >
          {favourites?.map((recipe: RecipeBrief) => (
            <FavouriteRecipeCard
              key={recipe.id}
              data={recipe}
              onRemove={handleRemove}
            />
          ))}
        </section>
      </MainLayout>
    </>
  );
}
