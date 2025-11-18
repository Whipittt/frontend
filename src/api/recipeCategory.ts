const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const ENDPOINTS = {
  allCategories: `${API_URL}/recipes/recipe-categories/?limit=25`,
};

export const RecipeCategoryApi = {
  fetchAllCategories: async (authFetch: typeof fetch) => {
    const categories = await authFetch(ENDPOINTS.allCategories, {
      method: "GET",
      credentials: "include",
    });

    if (!categories.ok)
      throw new Error("An error occured while fetching recipe categories");
    return await categories.json();
  },
};
