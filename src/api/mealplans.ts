import { API_URL } from "@/constants";
import type { MealplanPayload } from "@/types";
import { handleFetchError } from "@/utils/fastAPIErrorParser";

const ENDPOINTS_BASE = `${API_URL}/mealplans`;

const ENDPOINTS = {
  base: ENDPOINTS_BASE,
  baseWithID: (mealplanID: string) => `${ENDPOINTS_BASE}/${mealplanID}`,
  latest: `${ENDPOINTS_BASE}/latest`,
  updateOneMeal: (mealplanID: string, day: string, mealType: string) =>
    `${ENDPOINTS_BASE}/${mealplanID}/days/${day}/meals/${mealType}`,
};

export const mealplanAPI = {
  async new(authFetch: typeof fetch, payload: MealplanPayload) {
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
        "An error occured while creating mealplan."
      );
    else return await res.json();
  },

  async fetchByID(authFetch: typeof fetch, mealplanId: string) {
    const res = await authFetch(ENDPOINTS.baseWithID(mealplanId), {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok)
      throw await handleFetchError(
        res,
        `An error occured while fetching mealplan with id ${mealplanId}`
      );
    else return res.json();
  },

  async latest(authFetch: typeof fetch) {
    const res = await authFetch(ENDPOINTS.latest, {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 404) {
      return {};
    }

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while fetching latest mealplan"
      );
    else return await res.json();
  },

  async update(
    authFetch: typeof fetch,
    mealplanID: string,
    payload: MealplanPayload
  ) {
    const res = await authFetch(ENDPOINTS.baseWithID(mealplanID), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while updating mealplan."
      );
    else return await res.json();
  },

  async updateOneMeal(
    authFetch: typeof fetch,
    mealplanID: string,
    day: string,
    mealType: string,
    payload: { recipe_id: string }
  ) {
    const res = await authFetch(
      ENDPOINTS.updateOneMeal(mealplanID, day, mealType),
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
        "An error occured while updating mealplan meal recipe."
      );
    else return await res.json();
  },
};
