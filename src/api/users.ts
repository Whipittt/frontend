import { API_URL } from "@/constants";
import type { PasswordResetPayload, User, UserUpdatePayload } from "@/types";
import { handleFetchError } from "@/utils/fastAPIErrorParser";
import { DEFAULT_LIMIT, URLWithPagination } from "@/utils/urlWithPagination";

const BASE_URL = `${API_URL}/users`;

const ENDPOINTS = {
  base: `${BASE_URL}/`,
  fetchByID(userId: string): string {
    return `${BASE_URL}/${userId}`;
  },
  fetchFavourites: `${BASE_URL}/favourites/`,
  fetchUsers: `${BASE_URL}/`,
  resetPassword(userID: string): string {
    return `${BASE_URL}/${userID}/reset-password`;
  },
  updateByID(userID: string): string {
    return `${BASE_URL}/${userID}/`;
  },
  fetchProfile: `${BASE_URL}/profile`,
};

export const UserAPI = {
  async fetchProfile(authFetch: typeof fetch) {
    const res = await authFetch(ENDPOINTS.fetchProfile, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while fetching user's profile"
      );
    else return await res.json();
  },

  async fetchFavourites(authFetch: typeof fetch) {
    const res = await authFetch(ENDPOINTS.fetchFavourites, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while fetching user's favourites"
      );
    else return await res.json();
  },

  async update(authFetch: typeof fetch, payload: UserUpdatePayload) {
    const res = await authFetch(ENDPOINTS.base, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok)
      throw await handleFetchError(
        res,
        "An error occured while updating user's data."
      );
    else return await res.json();
  },

  admin: {
    async addOne(authFetch: typeof fetch, payload: User) {
      const res = await authFetch(ENDPOINTS.base, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        throw await handleFetchError(res, "An error occured while adding user");
      else return (await res.json()) as User;
    },

    async fetchAll(authFetch: typeof fetch, skip = 0, limit = DEFAULT_LIMIT) {
      const res = await authFetch(
        URLWithPagination(ENDPOINTS.fetchUsers, skip, limit),
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok)
        throw await handleFetchError(
          res,
          "An error occured while updating users."
        );
      else return await res.json();
    },

    async fetchByID(authFetch: typeof fetch, userId: string) {
      const res = await authFetch(ENDPOINTS.fetchByID(userId), {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok)
        throw await handleFetchError(
          res,
          `An error occured while fetching user with id ${userId}`
        );
      else return res.json();
    },

    async updateByID(
      authFetch: typeof fetch,
      userId: string,
      payload: UserUpdatePayload
    ) {
      const res = await authFetch(ENDPOINTS.updateByID(userId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        throw await handleFetchError(
          res,
          "An error occured while updating user's data."
        );
      else return await res.json();
    },

    async resetPassword(
      authFetch: typeof fetch,
      userId: string,
      payload: PasswordResetPayload
    ) {
      const res = await authFetch(ENDPOINTS.resetPassword(userId), {
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
          "An error occured while resetting user's password."
        );
      else return await res.json();
    },
  },
};
