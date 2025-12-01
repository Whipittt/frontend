import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { PropsWithChildren } from "react";

/**
 * - Access token (HttpOnly cookie) lasts 15 minutes.
 * - Refresh token (HttpOnly cookie) lasts 7 days.
 * - We cannot read HttpOnly cookies in JS; we "refresh on demand" and on a timer.
 * - If the refresh token is missing/expired, refresh will fail and we auto-logout.
 */

type User = {
  id: string;
  fullname: string;
  email: string;
  is_superuser: boolean;
};

type Credentials = {
  email: string;
  password: string;
};

type AuthServiceType = {
  user: User | null;
  isAuthenticated: boolean;
  isSuperuser: boolean;
  loading: boolean;
  login: (creds: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  /**
   * Ensure the session is valid:
   * - Tries to load current user.
   * - If unauthorized, attempts a token refresh and retries.
   * - Logs out if refresh fails
   */
  refresh: () => Promise<void>;
  /**
   * Helper to make authenticated requests with cookies.
   * - If a request returns 401/419, it tries to refresh and retries once.
   * - If refresh fails, it logs out and returns the original 401/419 response.
   */
  authFetch: (
    input: RequestInfo | URL,
    init?: RequestInit
  ) => Promise<Response>;
};

const API_BASE = import.meta.env.VITE_BACKEND_BASE_URL;
const api = (path: string) => `${API_BASE}${path}`;

const ENDPOINTS = {
  me: api(import.meta.env.VITE_GET_USER_ENDPOINT),
  login: api(import.meta.env.VITE_LOGIN_ENDPOINT),
  logout: api(import.meta.env.VITE_LOGOUT_ENDPOINT),
  refresh: api(import.meta.env.VITE_REFRESH_ENDPOINT),
};

const ACCESS_TOKEN_MINUTES = Number(
  import.meta.env.VITE_ACCESS_TOKEN_EXPITES_MINUTES ?? 5
);
const SKEW_MINUTES = Number(import.meta.env.VITE_SKEW_MINUTES ?? 3);

const PROACTIVE_REFRESH_INTERVAL_MS =
  Math.max(1, ACCESS_TOKEN_MINUTES - SKEW_MINUTES) * 60 * 1000;

export const AuthService = createContext<AuthServiceType | undefined>(
  undefined
);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Prevent concurrent refresh storms; deduplicate refresh calls.
  const refreshInFlight = useRef<Promise<boolean> | null>(null);

  // Always include credentials so cookies are sent with requests.
  const baseFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const merged: RequestInit = {
      credentials: "include",
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.headers || {}),
      },
    };
    return fetch(input, merged);
  };

  // Fetch current user WITHOUT mutating state on failure.
  // Returns { ok, user?, status } so caller decides how to update state.
  const fetchUser = async (): Promise<
    { ok: true; user: User } | { ok: false; status: number }
  > => {
    try {
      const res = await baseFetch(ENDPOINTS.me, { method: "GET" });
      if (res.ok) {
        const data = (await res.json()) as User;
        return { ok: true, user: data };
      }
      return { ok: false, status: res.status };
    } catch {
      return { ok: false, status: 0 };
    }
  };

  // Refresh access token using the refresh cookie; return true if success.
  const refreshTokens = async (): Promise<boolean> => {
    try {
      const res = await baseFetch(ENDPOINTS.refresh, { method: "POST" });
      if (res.ok) return true;
      if (res.status === 401 || res.status === 419) return false;
      return false;
    } catch {
      // Network error: force-logout immediately; let caller decide.
      return false;
    }
  };

  // Deduplicated refresh promise.
  const ensureFreshAccess = async (): Promise<boolean> => {
    if (!refreshInFlight.current) {
      refreshInFlight.current = (async () => {
        const ok = await refreshTokens();
        return ok;
      })().finally(() => {
        refreshInFlight.current = null;
      });
    }
    return refreshInFlight.current;
  };

  // Public refresh: do NOT clear user on 401 before attempting refresh.
  const refresh: AuthServiceType["refresh"] = async () => {
    const first = await fetchUser();
    if (first.ok) {
      setUser(first.user);
      return;
    }

    // If unauthorized/expired, try to refresh
    if (first.status === 401 || first.status === 419) {
      const refreshed = await ensureFreshAccess();
      if (!refreshed) {
        await hardLogout(); // refresh cookie gone/expired -> logout
        return;
      }

      const second = await fetchUser();
      if (second.ok) {
        setUser(second.user);
        return;
      }

      // Couldn't load user even after refresh -> logout
      await hardLogout();
      return;
    }

    // Other errors: keep current user state; might want to log/track
  };

  // Fetch with auto-refresh-once and retry.
  const authFetch: AuthServiceType["authFetch"] = async (input, init) => {
    const first = await baseFetch(input, init);
    if (first.status === 401) { // Experimental
      // toast.warning("login required");
      // navigate("/login");
    }
    
    if (first.status !== 401 && first.status !== 419) return first;

    const refreshed = await ensureFreshAccess();
    if (!refreshed) {
      await hardLogout();
      return first;
    }
    return baseFetch(input, init);
  };

  // Login and load user.
  const login: AuthServiceType["login"] = async ({ email, password }) => {
    const body = new URLSearchParams();
    body.set("email", email);
    body.set("password", password);

    const res = await baseFetch(ENDPOINTS.login, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) {
      const msg = await safeMessage(res);
      throw new Error(msg || "Failed to sign in");
    }

    await refresh();
  };

  // Backend logout to clear cookies; clear local state regardless.
  const hardLogout = async () => {
    try {
      await baseFetch(ENDPOINTS.logout, { method: "POST" });
    } finally {
      setUser(null);
    }
  };

  const logout: AuthServiceType["logout"] = async () => {
    await hardLogout();
  };

  // Initial session check on mount.
  useEffect(() => {
    let mounted = true;
    (async () => {
      await refresh();
      if (mounted) setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Proactive refresh timer: keep session alive while user is active.
  useEffect(() => {
    const id = window.setInterval(() => {
      refresh().catch(() => void 0);
    }, PROACTIVE_REFRESH_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  // Re-validate when tab gains focus (helps multi-tab scenarios).
  // useEffect(() => {
  //   const onFocus = () => {
  //     refresh().catch(() => void 0);
  //   };
  //   window.addEventListener('focus', onFocus);
  //   return () => window.removeEventListener('focus', onFocus);
  // }, []);

  const value = useMemo<AuthServiceType>(
    () => ({
      user,
      isAuthenticated: !!user,
      isSuperuser: !!user?.is_superuser,
      loading,
      login,
      logout,
      refresh,
      authFetch,
    }),
    [user, loading]
  );

  return <AuthService.Provider value={value}>{children}</AuthService.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthService);
  if (!ctx) throw new Error("AuthService must be used within AuthProvider");
  return ctx;
}

async function safeMessage(res: Response) {
  try {
    const text = await res.text();
    try {
      const data = JSON.parse(text) as {
        detail?: string;
        message?: string;
        error?: string;
      };
      return data.detail || data.message || data.error || text;
    } catch {
      return text;
    }
  } catch {
    return "";
  }
}
