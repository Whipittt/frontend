import { API_URL } from "@/constants";
import type { RecipeCategory } from "@/types";
import { handleFetchError } from "@/utils/fastAPIErrorParser";

const ENDPOINT_BASE = `${API_URL}/recipes/recipe-categories/`;

const ENDPOINTS = {
  base: ENDPOINT_BASE,
};

export const RecipeCategoryApi = {
  fetchAll: async () => {
    const res = await fetch(ENDPOINTS.base);

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while fetching recipe categories"
      );
    return await res.json();
  },

  admin: {
    addOne: async (authFetch: typeof fetch, categoryData: RecipeCategory) => {
      const res = await authFetch(ENDPOINTS.base, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(categoryData),
      });

      if (!res.ok)
        throw await handleFetchError(
          res,
          "An error occured while adding recipe category"
        );
      else return (await res.json()) as RecipeCategory;
    },
  },
};
