import { RecipeAPI } from "@/api/recipes";
import { UserAPI } from "@/api/users";
import { DEFAULT_CACHE_STALE_TIME } from "@/constants";
import { queryClient } from "@/lib/utils";
import { useAuth } from "@/services/authService";
import type { NewRecipe, Recipe } from "@/types";
import { DEFAULT_LIMIT } from "@/utils/urlWithPagination";
import { useMutation, useQuery } from "@tanstack/react-query";

const QUERY_KEY = "recipes";

export function useUserRecipeRecommendationsCache() {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return RecipeAPI.fetchUserRecommendations(authFetch);
  };

  return useQuery<Recipe[]>({
    queryKey: [QUERY_KEY, "user_recommendations"],
    queryFn: queryFunction,
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function useRecipeRecommendationsCache() {
  const queryFunction = () => {
    return RecipeAPI.fetchRecommendations();
  };

  return useQuery({
    queryKey: [QUERY_KEY, "recommendations"],
    queryFn: queryFunction,
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function useOneRecipeCache(recipe_id: string) {
  const { authFetch, loading, isAuthenticated } = useAuth();
  return useQuery({
    queryKey: [QUERY_KEY, !!isAuthenticated, recipe_id],
    queryFn: () => {
      return isAuthenticated
        ? RecipeAPI.fetchWithFavouriteStatus(authFetch, recipe_id)
        : RecipeAPI.fetchByID(recipe_id);
    },
    enabled: !loading,
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function useLocalFavouriteRecipeCache() {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return RecipeAPI.fetchLocalFavourites(authFetch);
  };

  return useQuery({
    queryKey: [QUERY_KEY, "local_favourites"],
    queryFn: queryFunction,
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function useRecipesOfTheWeekCache() {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return RecipeAPI.fetchRecipesOfTheWeek(authFetch);
  };

  return useQuery({
    queryKey: [QUERY_KEY, "weekly"],
    queryFn: queryFunction,
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function useFavouriteRecipesCache() {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return UserAPI.fetchFavourites(authFetch);
  };

  return useQuery({
    queryKey: [QUERY_KEY, "my_favourites"],
    queryFn: queryFunction,
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function useCategorizedRecipesCache(category_name: string) {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return RecipeAPI.filterByCategory(authFetch, category_name);
  };

  return useQuery({
    queryKey: [QUERY_KEY, category_name],
    queryFn: queryFunction,
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function useRecipesData(skip = 0, limit = DEFAULT_LIMIT) {
  const { authFetch } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEY, skip, limit],
    queryFn: async () => await RecipeAPI.admin.fetchAll(authFetch, skip, limit),
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function useAddRecipeData() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async (newRecipeData: NewRecipe) =>
      await RecipeAPI.admin.addRecipe(authFetch, newRecipeData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 0, DEFAULT_LIMIT],
      });
    },
  });
}
