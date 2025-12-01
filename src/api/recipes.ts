const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const RECIPE_ENDPOINTS_BASE = `${API_URL}/recipes`;

const RECIPE_ENDPOINTS = {
  base: `${API_URL}/recipes/`,
  getRecommendations: `${RECIPE_ENDPOINTS_BASE}/recommendations`,
  getLocalFavourites: `${RECIPE_ENDPOINTS_BASE}/local-favourites`,
  getRecipesOfTheWeek: `${RECIPE_ENDPOINTS_BASE}/weekly`,
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

  filterRecipesByCategory: async (
    authFetch: typeof fetch,
    category: string
  ) => {
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
