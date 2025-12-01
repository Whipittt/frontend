import { ingredientsAPI } from "@/api/ingredients";
import type { Ingredient } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useIngredientsCache() {
  return useQuery<Ingredient[]>({
    queryFn: () => {
      return ingredientsAPI.fetchAll();
    },
    queryKey: ["ingredients"],
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
