import { mealplanAPI } from "@/api/mealplans";
import { DEFAULT_CACHE_STALE_TIME } from "@/constants";
import { queryClient } from "@/lib/utils";
import { useAuth } from "@/services/authService";
import type { MealPlanOut, MealplanPayload } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const QUERY_KEY = "mealplans";

export function useLatestMealplanData() {
  const { authFetch, loading, user } = useAuth();

  return useQuery<MealPlanOut>({
    queryKey: [QUERY_KEY, "latest", user?.id],
    queryFn: () => {
      return mealplanAPI.latest(authFetch);
    },
    staleTime: DEFAULT_CACHE_STALE_TIME,
    enabled: !loading,
    retry: 1,
  });
}

export function useCreateMealplanData() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async (payload: MealplanPayload) => {
      return await mealplanAPI.new(authFetch, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, "latest"],
      });
    },
  });
}

export function useUpdateMealplanData() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async ({
      mealplanID,
      payload,
    }: {
      mealplanID: string;
      payload: MealplanPayload;
    }) => {
      return await mealplanAPI.update(authFetch, mealplanID, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, "latest"],
      });
    },
  });
}

export function useUpdateOneMealplanMealData() {
  const { authFetch } = useAuth();

  return useMutation({
    mutationFn: async ({
      mealplanID,
      day,
      mealType,
      payload,
    }: {
      mealplanID: string;
      day: string;
      mealType: string;
      payload: { recipe_id: string };
    }) => {
      return await mealplanAPI.updateOneMeal(
        authFetch,
        mealplanID,
        day,
        mealType,
        payload
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, "latest"],
      });
    },
  });
}
