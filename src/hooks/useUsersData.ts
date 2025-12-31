import { preferenceAPI } from "@/api/preferences";
import { UserAPI } from "@/api/users";
import { DEFAULT_CACHE_STALE_TIME } from "@/constants";
import { queryClient } from "@/lib/utils";
import { useAuth } from "@/services/authService";
import type {
  PasswordResetPayload,
  Preference,
  User,
  UserProfile,
  UserUpdatePayload,
} from "@/types";
import { DEFAULT_LIMIT } from "@/utils/urlWithPagination";
import { useQuery, useMutation } from "@tanstack/react-query";

export const QUERY_KEY = "users";

export function useListUsersData(skip = 0, limit = DEFAULT_LIMIT) {
  const { authFetch } = useAuth();

  return useQuery<User[]>({
    queryFn: () => {
      return UserAPI.admin.fetchAll(authFetch, skip, limit);
    },
    queryKey: [QUERY_KEY, skip],
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}

export function useProfileData() {
  const { authFetch, user } = useAuth();

  return useQuery<UserProfile>({
    queryKey: [QUERY_KEY, "profile", user?.id],
    queryFn: () => {
      return UserAPI.fetchProfile(authFetch);
    },
    staleTime: DEFAULT_CACHE_STALE_TIME,
    enabled: !!user?.id && !!authFetch,
    retry: 1,
  });
}

export function useAddUserData() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async (userData: User) => {
      return await UserAPI.admin.addOne(authFetch, userData);
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 0] });
      queryClient.invalidateQueries({ queryKey: ["metrics", "users"] });
    },
  });
}

export function useUpdateUserDataByID() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async ({
      userID,
      payload,
    }: {
      userID: string;
      payload: UserUpdatePayload;
    }) => {
      return await UserAPI.admin.updateByID(authFetch, userID, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metrics", "users"] });
    },
  });
}

export function useUpdateProfileData() {
  const { authFetch, user } = useAuth();

  return useMutation({
    mutationFn: async (payload: UserUpdatePayload) => {
      return await UserAPI.update(authFetch, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, "profile", user?.id],
      });
    },
  });
}

export function useResetUserPassword() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async ({
      userID,
      payload,
    }: {
      userID: string;
      payload: PasswordResetPayload;
    }) => {
      return await UserAPI.admin.resetPassword(authFetch, userID, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 0] });
    },
  });
}

export function useAddPreferenceData() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async (preferenceData: Preference) => {
      return await preferenceAPI.newPreference(authFetch, preferenceData);
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "profile"] });
    },
  });
}

export function useUpdatePreferenceData() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async (preferenceData: Preference) => {
      return await preferenceAPI.updatePreference(authFetch, preferenceData);
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "profile"] });
    },
  });
}
