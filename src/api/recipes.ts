const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const RECIPE_ENDPOINTS = {
  base: `${API_URL}/recipes/`,
  getRecommendations: `${API_URL}/recipes/recommendations`,
  getLocalFavourites: `${API_URL}/recipes/local-favourites`,
  getRecipesOfTheWeek: `${API_URL}/recipes/weekly`,
};

export const RecipeAPI = {
  fetchRecommendations: async (authFetch: typeof fetch) => {
    const recommendations = await authFetch(
      RECIPE_ENDPOINTS.getRecommendations,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!recommendations.ok)
      throw new Error("An error occured while fetching recipe categories");
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

  fetchRecipebyID: async (
    authFetch: typeof fetch,
    recipeId: string | undefined
  ) => {
    const recipe = await authFetch(`${RECIPE_ENDPOINTS.base}${recipeId}/`, {
      method: "GET",
      credentials: "include",
    });

    if (recipe.status == 403)
      throw new Error("You are not allowed to access this recipe");
    if (!recipe.ok)
      throw new Error(`Unable to load recipe with id ${recipeId}`);
    return recipe.json();
  },
};
