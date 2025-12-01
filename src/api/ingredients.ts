import { handleFetchError } from "@/utils/fastAPIErrorParser";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const RECIPE_ENDPOINTS_BASE = `${API_URL}/ingredients`;

const INGREDIENT_ENDPOINTS = {
  base: RECIPE_ENDPOINTS_BASE,
  searchByKeyword: (keyword: string) => {
    return `${RECIPE_ENDPOINTS_BASE}/filter/?keyword=${keyword}`;
  },
};

export const ingredientsAPI = {
  fetchAll: async () => {
    const response = await fetch(INGREDIENT_ENDPOINTS.base);
    return response.json();
  },

  searchByKeyword: async (keyword: string) => {
    const response = await fetch(INGREDIENT_ENDPOINTS.searchByKeyword(keyword));
    handleFetchError(response, "An error occured while fetching Ingredients");
    return await response.json();
  },
};
