import { RecipeCategoryApi } from "@/api/recipeCategory";
import { useAuth } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";


export function useCategories() {
  const { authFetch } = useAuth()

  const queryFunction = () => {
    return RecipeCategoryApi.fetchAllCategories(authFetch);
  }

  return useQuery({
    queryKey: ["recipe_categories"],
    queryFn: queryFunction,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}