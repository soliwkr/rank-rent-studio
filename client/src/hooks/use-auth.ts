import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string | null;
  plan: string;
}

interface SessionData {
  authenticated: boolean;
  user: AuthUser | null;
}

export function useAuth() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery<SessionData>({
    queryKey: ["/api/auth/session"],
    queryFn: () =>
      apiRequest("GET", "/api/auth/session").then((r) => r.json()),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      apiRequest("POST", "/api/auth/login", { email, password }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/auth/session"] }),
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/auth/logout"),
    onSuccess: () => {
      qc.setQueryData(["/api/auth/session"], { authenticated: false, user: null });
      qc.clear();
    },
  });

  return {
    user: data?.user ?? null,
    isAuthenticated: data?.authenticated ?? false,
    isLoading,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    loginError: loginMutation.error,
    isLoggingIn: loginMutation.isPending,
  };
}
