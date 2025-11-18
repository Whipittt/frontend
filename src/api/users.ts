const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const USER_ENDPOINTS = {
  base: `${API_URL}/users/`,
  getFavourites: `${API_URL}/users/favourites/`,
  getAllUsers: `${API_URL}/users/`,
};

export const UserAPI = {
  fetchAllUsers: async (authFetch: typeof fetch) => {
    const recommendations = await authFetch(
      USER_ENDPOINTS.getAllUsers,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!recommendations.ok)
      throw new Error("An error occured while fetching users");
    return await recommendations.json();
  },

  fetchFavourites: async (authFetch: typeof fetch) => {
    const favourites = await authFetch(USER_ENDPOINTS.getFavourites, {
      method: "GET",
      credentials: "include",
    });

    if (!favourites.ok)
      throw new Error("An error occured while fetching user's favourites");
    return await favourites.json();
  },

  fetchUserbyID: async (
    authFetch: typeof fetch,
    userId: string | undefined
  ) => {
    const user = await authFetch(`${USER_ENDPOINTS.base}${userId}/`, {
      method: "GET",
      credentials: "include",
    });

    if (user.status == 403)
      throw new Error("You are not allowed to access this user");
    if (!user.ok)
      throw new Error(`Unable to load user with id ${userId}`);
    return user.json();
  },
};
