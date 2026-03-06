import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AuthUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  plan: string;
}

interface SessionData {
  authenticated: boolean;
  user: AuthUser | null;
}

export function useAuth() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<SessionData>({
    queryKey: ["/api/auth/session"],
    queryFn: () => apiRequest("GET", "/api/auth/session").then((r) => r.json()),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (creds: { email: string; password: string }) =>
      apiRequest("POST", "/api/auth/login", creds).then((r) => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/auth/session"] }),
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/auth/logout").then((r) => r.json()),
    onSuccess: () => {
      queryClient.clear();
      window.location.href = "/login";
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
