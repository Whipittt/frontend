import { RecipeCategoryApi } from "@/api/recipeCategory";
import { useAuth } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export function useRecipeCategoryCache() {
  const { authFetch } = useAuth();

  return useQuery({
    queryKey: ["recipe_categories"],
    queryFn: () => {
      return RecipeCategoryApi.fetchAllCategories(authFetch);
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
