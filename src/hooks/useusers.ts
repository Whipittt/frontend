import { UserAPI } from "@/api/users";
import { useAuth } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export function useAllUsers() {
  const { authFetch } = useAuth();

  const queryFunction = () => {
    return UserAPI.fetchAllUsers(authFetch);
  };

  return useQuery({
    queryKey: ["users"],
    queryFn: queryFunction,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
