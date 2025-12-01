import { RecipeAPI } from "@/api/recipes";
import { UserAPI } from "@/api/users";
import { useAuth } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export function useRecipeRecommendationsCache() {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return RecipeAPI.fetchRecommendations(authFetch);
  };

  return useQuery({
    queryKey: ["recipe_recommendations"],
    queryFn: queryFunction,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useLocalFavouriteRecipeCache() {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return RecipeAPI.fetchLocalFavourites(authFetch);
  };

  return useQuery({
    queryKey: ["local_favourites"],
    queryFn: queryFunction,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useRecipesOfTheWeekCache() {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return RecipeAPI.fetchRecipesOfTheWeek(authFetch);
  };

  return useQuery({
    queryKey: ["recipes_of_the_week"],
    queryFn: queryFunction,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useFavouriteRecipesCache() {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return UserAPI.fetchFavourites(authFetch);
  };

  return useQuery({
    queryKey: ["favourites"],
    queryFn: queryFunction,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useCategorizedRecipesCache(category_name: string) {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return RecipeAPI.filterRecipesByCategory(authFetch, category_name);
  };

  return useQuery({
    queryKey: [`${category_name}_recipes`],
    queryFn: queryFunction,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
