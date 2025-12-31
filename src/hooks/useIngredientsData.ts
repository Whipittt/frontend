import { ingredientsAPI } from "@/api/ingredients";
import { DEFAULT_CACHE_STALE_TIME } from "@/constants";
import { queryClient } from "@/lib/utils";
import { useAuth } from "@/services/authService";
import type { Ingredient } from "@/types";
import { DEFAULT_LIMIT } from "@/utils/urlWithPagination";
import { useMutation, useQuery } from "@tanstack/react-query";

const QUERY_KEY = "ingredients";

export default function listIngredientsData(skip = 0, limit = DEFAULT_LIMIT) {
  return useQuery<Ingredient[]>({
    queryFn: () => {
      return ingredientsAPI.admin.fetchAll(skip, limit);
    },
    queryKey: [QUERY_KEY, skip],
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function addIngredientsData() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async (ingredientData: Ingredient) => {
      return await ingredientsAPI.admin.addOne(authFetch, ingredientData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 0],
      });
      queryClient.invalidateQueries({
        queryKey: ["metrics", "ingredients"],
      });
    },
  });
}

export function updateIngredientsData() {
  const { authFetch } = useAuth();

  type UpdateIngredientVars = {
    ingredientID: string;
    payload: Ingredient;
  };

  return useMutation({
    mutationFn: async ({ ingredientID, payload }: UpdateIngredientVars) =>
      await ingredientsAPI.admin.update(authFetch, ingredientID, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 0],
      });
    },
  });
}

export function deleteIngredientsData() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async (ingredientID: string) =>
      await await ingredientsAPI.admin.delete(authFetch, ingredientID),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 0],
      });
      queryClient.invalidateQueries({
        queryKey: ["metrics", "ingredients"],
      });
    },
  });
}
