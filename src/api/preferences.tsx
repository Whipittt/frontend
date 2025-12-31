import { API_URL } from "@/constants";
import type { Preference } from "@/types";
import { handleFetchError } from "@/utils/fastAPIErrorParser";

const BASE_URL = `${API_URL}/preferences`;

const ENDPOINTS = {
  base: `${BASE_URL}/`,
  dietaryRestrictionBase: `${BASE_URL}/dietary-restrictions`,
};

export const preferenceAPI = {
  fetchRestrictions: async () => {
    const res = await fetch(ENDPOINTS.dietaryRestrictionBase);

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while fetching dietary restrictions"
      );
    else return await res.json();
  },

  newPreference: async (authFetch: typeof fetch, payload: Preference) => {
    const res = await authFetch(ENDPOINTS.base, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while adding preferences"
      );
    else return await res.json();
  },

  updatePreference: async (authFetch: typeof fetch, payload: Preference) => {
    const res = await authFetch(ENDPOINTS.base, {
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
        "An error occured while updating preferences"
      );
    else return await res.json();
  },
};
