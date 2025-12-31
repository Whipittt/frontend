const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const METRICS_ENDPOINTS = {
  base: `${API_URL}/metrics/`,
};

export const MetricsAPI = {
  fetchMetrics: async (authFetch: typeof fetch, key: string) => {
    const metricsData = await authFetch(`${METRICS_ENDPOINTS.base}${key}`, {
      method: "GET",
      credentials: "include",
    });

    if (!metricsData.ok)
      throw new Error("An error occured while fetching metrics");
    return await metricsData.json();
  },
};
