import { API_URL } from "@/constants";
import type { Ingredient } from "@/types";
import { handleFetchError } from "@/utils/fastAPIErrorParser";
import { DEFAULT_LIMIT, URLWithPagination } from "@/utils/urlWithPagination";

const ENDPOINTS_BASE = `${API_URL}/ingredients`;

const INGREDIENT_ENDPOINTS = {
  base: ENDPOINTS_BASE,
  baseWithID: (id: string) => `${ENDPOINTS_BASE}/${id}`,
  searchByKeyword: (keyword: string) => {
    return `${ENDPOINTS_BASE}/filter/?keyword=${keyword}`;
  },
};

export const ingredientsAPI = {
  searchByKeyword: async (keyword: string) => {
    const res = await fetch(INGREDIENT_ENDPOINTS.searchByKeyword(keyword));
    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while fetching Ingredients"
      );
    else return await res.json();
  },

  admin: {
    addOne: async (authFetch: typeof fetch, newIngredientData: Ingredient) => {
      const res = await authFetch(INGREDIENT_ENDPOINTS.base, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newIngredientData),
      });
      if (!res.ok)
        throw await handleFetchError(
          res,
          "An error occured while adding Ingredient"
        );
      else return res.json();
    },

    fetchByID: async (authFetch: typeof fetch, ingredientID: string) => {
      const res = await authFetch(
        INGREDIENT_ENDPOINTS.baseWithID(ingredientID)
      );
      if (!res.ok)
        throw await handleFetchError(
          res,
          `An error occured while fetching Ingredient with id ${ingredientID}`
        );
      else return res.json();
    },

    fetchWithRecipes: async (authFetch: typeof fetch, ingredientID: string) => {
      const res = await authFetch(
        `${INGREDIENT_ENDPOINTS.baseWithID(ingredientID)}/recipes`
      );
      if (!res.ok)
        throw await handleFetchError(
          res,
          `An error occured while fetching Ingredient with id ${ingredientID}`
        );
      else return res.json();
    },

    fetchAll: async (skip = 0, limit = DEFAULT_LIMIT) => {
      const res = await fetch(
        URLWithPagination(INGREDIENT_ENDPOINTS.base, skip, limit)
      );
      if (!res.ok)
        throw await handleFetchError(
          res,
          "An error occured while fetching Ingredients"
        );
      return res.json();
    },

    update: async (
      authFetch: typeof fetch,
      ingredientsID: string,
      payload: Ingredient
    ) => {
      const res = await authFetch(
        INGREDIENT_ENDPOINTS.baseWithID(ingredientsID),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok)
        throw await handleFetchError(
          res,
          "An error occured while updating Ingredient"
        );
      else return res.json();
    },

    delete: async (authFetch: typeof fetch, ingredientsID: string) => {
      const res = await authFetch(
        INGREDIENT_ENDPOINTS.baseWithID(ingredientsID),
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok)
        throw await handleFetchError(
          res,
          `An error occured while deleting Ingredient with id ${ingredientsID}`
        );
      else return res.json();
    },
  },
};
