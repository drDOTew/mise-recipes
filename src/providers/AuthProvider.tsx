"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import type { User, LoginPayload, RegisterPayload, AuthResponse } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { name: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user on mount
  const { data, isLoading: isFetchingUser } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      try {
        const response = await api.get<AuthResponse>(endpoints.auth.me);
        return response.user;
      } catch {
        return null;
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    setIsLoading(isFetchingUser);
  }, [data, isFetchingUser]);

  function setTokenCookie(token: string) {
    document.cookie = `token=${token}; path=/; Secure; SameSite=Lax`;
  }

  function clearTokenCookie() {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await api.post<AuthResponse>(endpoints.auth.login, payload);
      return response;
    },
    onSuccess: (data) => {
      setTokenCookie(data.token);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await api.post<AuthResponse>(endpoints.auth.register, payload);
      return response;
    },
    onSuccess: (data) => {
      setTokenCookie(data.token);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post(endpoints.auth.logout);
    },
    onSuccess: () => {
      clearTokenCookie();
      setUser(null);
      queryClient.clear();
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      // This would be a PATCH to /auth/me in a real app
      // For now, simulate it
      return { ...user, ...data } as User;
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const login = useCallback(
    async (payload: LoginPayload) => {
      await loginMutation.mutateAsync(payload);
    },
    [loginMutation]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      await registerMutation.mutateAsync(payload);
    },
    [registerMutation]
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const updateProfile = useCallback(
    async (data: { name: string }) => {
      await updateProfileMutation.mutateAsync(data);
    },
    [updateProfileMutation]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}