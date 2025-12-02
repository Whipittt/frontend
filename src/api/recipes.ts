const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const RECIPE_ENDPOINTS_BASE = `${API_URL}/recipes`;

const RECIPE_ENDPOINTS = {
  base: RECIPE_ENDPOINTS_BASE,
  getUserRecommendations: `${RECIPE_ENDPOINTS_BASE}/user-recommendations`,
  getRecommendations: `${RECIPE_ENDPOINTS_BASE}/recommendations`,
  getLocalFavourites: `${RECIPE_ENDPOINTS_BASE}/local-favourites`,
  getRecipesOfTheWeek: `${RECIPE_ENDPOINTS_BASE}/weekly`,
  fetchByWithUserFavouriteStatus: (recipeID: string | undefined): string => {
    return `${RECIPE_ENDPOINTS_BASE}/${recipeID}/favourite-status`;
  },
  filerRecipesByIngredient: (ingredients: string[]) => {
    const params = new URLSearchParams();

    ingredients.forEach((item) => {
      if (item.trim()) params.append("ingredients", item.trim());
    });

    return `${RECIPE_ENDPOINTS_BASE}/s/?${params.toString()}`;
  },
  filterRecipesByCategory: (category: string) => {
    const params = new URLSearchParams();

    params.append("category", category.trim());

    return `${RECIPE_ENDPOINTS_BASE}/s/categories?${params.toString()}`;
  },
  toggleFavourite: (recipeId: string) => {
    return `${RECIPE_ENDPOINTS_BASE}/${recipeId}/favourite/toggle`;
  },
};

export const RecipeAPI = {
  fetchUserRecommendations: async (authFetch: typeof fetch) => {
    const recommendations = await authFetch(
      RECIPE_ENDPOINTS.getUserRecommendations,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!recommendations.ok)
      throw new Error("An error occured while fetching user recommendations");
    return await recommendations.json();
  },

  fetchRecommendations: async () => {
    const recommendations = await fetch(RECIPE_ENDPOINTS.getRecommendations);

    if (!recommendations.ok)
      throw new Error("An error occured while fetching recommended recipes");
    return await recommendations.json();
  },

  fetchLocalFavourites: async (authFetch: typeof fetch) => {
    const localFavourites = await authFetch(
      RECIPE_ENDPOINTS.getLocalFavourites,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!localFavourites.ok)
      throw new Error("An error occured while fetching local favourites");
    return await localFavourites.json();
  },

  fetchRecipesOfTheWeek: async (authFetch: typeof fetch) => {
    const weeklies = await authFetch(RECIPE_ENDPOINTS.getRecipesOfTheWeek, {
      method: "GET",
      credentials: "include",
    });

    if (!weeklies.ok)
      throw new Error("An error occured while fetching local favourites");
    return await weeklies.json();
  },

  fetchByID: async (recipeId: string | undefined) => {
    const recipe = await fetch(`${RECIPE_ENDPOINTS.base}/${recipeId}/`);

    if (!recipe.ok)
      throw new Error(`Unable to load recipe with id ${recipeId}`);
    return recipe.json();
  },

  fetchWithFavouriteStatus: async (
    authFetch: typeof fetch,
    recipeId: string | undefined
  ) => {
    const recipe = await authFetch(
      RECIPE_ENDPOINTS.fetchByWithUserFavouriteStatus(recipeId),
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
    const recipes = await authFetch(
      RECIPE_ENDPOINTS.filerRecipesByIngredient(ingredients),
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!recipes.ok)
      throw new Error("An error occured while searching recipes");
    return await recipes.json();
  },

  filterByCategory: async (authFetch: typeof fetch, category: string) => {
    const recipes = await authFetch(
      RECIPE_ENDPOINTS.filterRecipesByCategory(category),
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!recipes.ok)
      throw new Error(
        `An error occured while filtering recipes with category ${category}`
      );
    return await recipes.json();
  },

  toggleFavourite: async (authFetch: typeof fetch, recipeId: string) => {
    const recipe = await authFetch(RECIPE_ENDPOINTS.toggleFavourite(recipeId), {
      method: "POST",
      credentials: "include",
    });

    if (!recipe.ok) throw new Error("An error occured while searching recipes");
    return await recipe.json();
  },
};
