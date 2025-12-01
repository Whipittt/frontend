import type { PasswordResetPayload, User, UserUpdatePayload } from "@/types";
import { FastAPIErrorParser, isFastAPIError } from "@/utils/fastAPIErrorParser";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const ENDPOINT_BASE_URL = `${API_URL}/users`;

const USER_ENDPOINTS = {
  base: `${ENDPOINT_BASE_URL}/`,
  getUserByID(userId: string): string {
    return `${ENDPOINT_BASE_URL}/${userId}`;
  },
  getUserFavourites: `${ENDPOINT_BASE_URL}/favourites/`,
  getAllUsers: `${ENDPOINT_BASE_URL}/`,
  resetUserPassword(userID: string): string {
    return `${ENDPOINT_BASE_URL}/${userID}/reset-password`;
  },
  updateUserDetails(userID: string): string {
    return `${ENDPOINT_BASE_URL}/${userID}/`;
  },
};

export const UserAPI = {
  async fetchFavourites(authFetch: typeof fetch) {
    const favourites = await authFetch(USER_ENDPOINTS.getUserFavourites, {
      method: "GET",
      credentials: "include",
    });

    if (!favourites.ok)
      throw new Error("An error occured while fetching user's favourites");
    return await favourites.json();
  },

  admin: {
    async addNewUser(authFetch: typeof fetch, payload: User) {
      const response = await authFetch(USER_ENDPOINTS.base, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();

        if (isFastAPIError(data))
          throw new Error(FastAPIErrorParser.first(data));

        throw new Error("An error occured while adding user.");
      }

      return await response.json();
    },

    async fetchAllUsers(authFetch: typeof fetch) {
      const users = await authFetch(USER_ENDPOINTS.getAllUsers, {
        method: "GET",
        credentials: "include",
      });

      if (!users.ok) throw new Error("An error occured while fetching users");
      return await users.json();
    },

    async fetchUserByID(authFetch: typeof fetch, userId: string) {
      const user = await authFetch(USER_ENDPOINTS.getUserByID(userId), {
        method: "GET",
        credentials: "include",
      });

      if (user.status == 403)
        throw new Error("You are not allowed to access this user");
      if (!user.ok) throw new Error(`Unable to load user with id ${userId}`);
      return user.json();
    },

    async updateUserDetails(
      authFetch: typeof fetch,
      userId: string,
      payload: UserUpdatePayload
    ) {
      const response = await authFetch(
        USER_ENDPOINTS.updateUserDetails(userId),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        if (isFastAPIError(data))
          throw new Error(FastAPIErrorParser.first(data));

        throw new Error("An error occured while updating user's data.");
      }

      return await response.json();
    },

    async resetUserPassword(
      authFetch: typeof fetch,
      userId: string,
      payload: PasswordResetPayload
    ) {
      const response = await authFetch(
        USER_ENDPOINTS.resetUserPassword(userId),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        if (isFastAPIError(data))
          throw new Error(FastAPIErrorParser.first(data));

        throw new Error("An error occured while resetting user's password.");
      }

      return await response.json();
    },
  },
};
