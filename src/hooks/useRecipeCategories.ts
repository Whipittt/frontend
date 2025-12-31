import { RecipeCategoryApi } from "@/api/recipeCategory";
import { DEFAULT_CACHE_STALE_TIME } from "@/constants";
import { queryClient } from "@/lib/utils";
import { useAuth } from "@/services/authService";
import type { RecipeCategory } from "@/types";
import { useQuery, useMutation } from "@tanstack/react-query";

const QUERY_KEY = "recipe_categories";

export function useRecipeCategoryData() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => {
      return RecipeCategoryApi.fetchAll();
    },
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function addRecipeCategoryData() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: (newCategoryData: RecipeCategory) => {
      return RecipeCategoryApi.admin.addOne(authFetch, newCategoryData);
    },

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      }),
  });
}
