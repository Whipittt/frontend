const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const INGREDIENT_ENDPOINTS = {
  searchByKeyword: (keyword: string) => {
    return `${API_URL}/ingredients/filter/?keyword=${keyword}`;
  },
};

export const IngredientAPI = {
  searchByKeyword: async (authFetch: typeof fetch, keyword: string) => {
    const recommendations = await authFetch(
      INGREDIENT_ENDPOINTS.searchByKeyword(keyword)
    );

    if (!recommendations.ok)
      throw new Error("An error occured while fetching Ingredients");
    return await recommendations.json();
  },
};
