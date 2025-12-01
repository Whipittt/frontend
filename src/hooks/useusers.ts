import { UserAPI } from "@/api/users";
import { useAuth } from "@/services/authService";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useAllUsersCache() {
  const { authFetch } = useAuth();

  return useQuery<User[]>({
    queryFn: () => {
      return UserAPI.admin.fetchAllUsers(authFetch);
    },
    queryKey: ["all_users"],
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
