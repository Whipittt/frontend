import type { NewRecipe } from "@/types";
import { handleFetchError } from "@/utils/fastAPIErrorParser";
import { DEFAULT_LIMIT, URLWithPagination } from "@/utils/urlWithPagination";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const ENDPOINTS_BASE = `${API_URL}/recipes/`;

const ENDPOINTS = {
  base: ENDPOINTS_BASE,
  baseWithId: (recipeID: string) => `${ENDPOINTS_BASE}${recipeID}`,
  getUserRecommendations: `${ENDPOINTS_BASE}user-recommendations`,
  getRecommendations: `${ENDPOINTS_BASE}recommendations`,
  getLocalFavourites: `${ENDPOINTS_BASE}local-favourites`,
  getRecipesOfTheWeek: `${ENDPOINTS_BASE}weekly`,
  fetchByWithUserFavouriteStatus: (recipeID: string | undefined): string =>
    `${ENDPOINTS_BASE}${recipeID}/favourite-status`,
  filerRecipesByIngredient: (ingredients: string[]) => {
    const params = new URLSearchParams();

    ingredients.forEach((item) => {
      if (item.trim()) params.append("ingredients", item.trim());
    });

    return `${ENDPOINTS_BASE}s/?${params.toString()}`;
  },
  filterRecipesByCategory: (category: string) => {
    const params = new URLSearchParams();

    params.append("category", category.trim());

    return `${ENDPOINTS_BASE}s/categories?${params.toString()}`;
  },
  filerRecipesByTitle: (title: string) => `${ENDPOINTS_BASE}s/?title=${title}`,
  toggleFavourite: (recipeId: string) =>
    `${ENDPOINTS_BASE}${recipeId}/favourite/toggle`,
};

export const RecipeAPI = {
  fetchUserRecommendations: async (authFetch: typeof fetch) => {
    const res = await authFetch(ENDPOINTS.getUserRecommendations, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok)
      throw handleFetchError(
        res,
        "An error occured while fetching user recommendations"
      );
    else return res.json();
  },

  fetchRecommendations: async () => {
    const res = await fetch(ENDPOINTS.getRecommendations);

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while fetching recommended recipes"
      );
    else return res.json();
  },

  fetchLocalFavourites: async (authFetch: typeof fetch) => {
    const res = await authFetch(ENDPOINTS.getLocalFavourites, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while fetching local favourites"
      );
    else return res.json();
  },

  fetchRecipesOfTheWeek: async (authFetch: typeof fetch) => {
    const weeklies = await authFetch(ENDPOINTS.getRecipesOfTheWeek, {
      method: "GET",
      credentials: "include",
    });

    if (!weeklies.ok)
      throw new Error("An error occured while fetching local favourites");
    return await weeklies.json();
  },

  fetchByID: async (recipeId: string | undefined) => {
    const res = await fetch(`${ENDPOINTS.base}${recipeId}/`);

    if (!res.ok)
      throw await handleFetchError(
        res,
        `Unable to load recipe with id ${recipeId}`
      );
    else return res.json();
  },

  fetchWithFavouriteStatus: async (
    authFetch: typeof fetch,
    recipeId: string | undefined
  ) => {
    const recipe = await authFetch(
      ENDPOINTS.fetchByWithUserFavouriteStatus(recipeId),
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!recipe.ok)
      throw new Error(`Unable to load recipe with id ${recipeId}`);
    return recipe.json();
  },

  filterRecipesByIngredient: async (
    authFetch: typeof fetch,
    ingredients: string[]
  ) => {
    const res = await authFetch(
      ENDPOINTS.filerRecipesByIngredient(ingredients),
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while searching recipes"
      );
    else return res.json();
  },

  filterRecipesByTitle: async (title: string, limit = DEFAULT_LIMIT) => {
    const res = await fetch(
      `${ENDPOINTS.filerRecipesByTitle(title)}&limit=${limit}`
    );

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while fetching recipes"
      );
    else return res.json();
  },

  filterByCategory: async (authFetch: typeof fetch, category: string) => {
    const res = await authFetch(ENDPOINTS.filterRecipesByCategory(category), {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok)
      throw handleFetchError(
        res,
        `An error occured while filtering recipes with category ${category}`
      );
    else return res.json();
  },

  toggleFavourite: async (authFetch: typeof fetch, recipeId: string) => {
    const res = await authFetch(ENDPOINTS.toggleFavourite(recipeId), {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok)
      throw handleFetchError(res, "An error occured while searching recipes");
    else return res.json();
  },

  admin: {
    addRecipe: async (authFetch: typeof fetch, payload: NewRecipe) => {
      const res = await authFetch(ENDPOINTS.base, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        throw await handleFetchError(
          res,
          "An error occured while adding recipe"
        );
      else return res.json();
    },

    fetchAll: async (
      authFetch: typeof fetch,
      skip = 0,
      limit = DEFAULT_LIMIT
    ) => {
      const res = await authFetch(
        URLWithPagination(ENDPOINTS.base, skip, limit),
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok)
        throw await handleFetchError(
          res,
          "An error occured while fetching recipes"
        );
      else return res.json();
    },

    update: async (
      authFetch: typeof fetch,
      recipeId: string,
      payload: NewRecipe
    ) => {
      const res = await authFetch(ENDPOINTS.baseWithId(recipeId), {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        throw await handleFetchError(
          res,
          `An error occured while updating recipe with id ${recipeId}`
        );
      else return res.json();
    },

    delete: async (authFetch: typeof fetch, recipeId: string) => {
      const res = await authFetch(ENDPOINTS.baseWithId(recipeId), {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok)
        throw await handleFetchError(
          res,
          `An error occured while deleting recipe with id ${recipeId}`
        );
      else return res.json();
    },
  },
};
