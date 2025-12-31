import { MetricsAPI } from "@/api/metrics";
import { DEFAULT_CACHE_STALE_TIME } from "@/constants";
import { useAuth } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export type MetricsKey = "ingredients" | "overview" | "recipes" | "users";

export default function useMetricsCache(key: MetricsKey) {
  const { authFetch } = useAuth();

  return useQuery({
    queryKey: ["metrics", key],
    queryFn: () => {
      return MetricsAPI.fetchMetrics(authFetch, key);
    },
    staleTime: DEFAULT_CACHE_STALE_TIME,
    retry: 1,
  });
}
