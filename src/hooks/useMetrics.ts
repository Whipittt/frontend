import { MetricsAPI } from "@/api/metrics";
import { useAuth } from "@/services/authService";
import type { MetricsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useMetricsCache() {
  const { authFetch } = useAuth();

  return useQuery<MetricsResponse>({
    queryKey: ["metrics", "dashboard"],
    queryFn: () => {
      return MetricsAPI.fetchMetrics(authFetch);
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
