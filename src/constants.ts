export const API_URL = String(import.meta.env.VITE_BACKEND_BASE_URL);

export const DEFAULT_CACHE_STALE_TIME = Number(
  import.meta.env.VITE_DEFAULT_CACHE_STALE_TIME ?? 1000 * 60 * 5
);

export const ACCESS_TOKEN_EXPIRES_MINUTES = Number(
  import.meta.env.VITE_ACCESS_TOKEN_EXPITES_MINUTES ?? 5
);

export const ACCESS_TOKEN_SKEW_MINUTES = Number(
  import.meta.env.VITE_SKEW_MINUTES ?? 3
);

export const ACCESS_TOKEN_PROACTIVE_REFRESH_INTERVAL_MS =
  Math.max(1, ACCESS_TOKEN_EXPIRES_MINUTES - ACCESS_TOKEN_SKEW_MINUTES) *
  60 *
  1000;

export const DEFAULT_ADMIN_PASSWORD = String(
  import.meta.env.VITE_DEFAULT_ADMIN_PASSWORD ?? "@9jafoodieadmin"
);
