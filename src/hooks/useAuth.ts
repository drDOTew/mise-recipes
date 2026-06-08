"use client";

import { useAuthContext } from "@/providers/AuthProvider";

export function useAuth() {
  const context = useAuthContext();
  
  return {
    user: context.user,
    isLoading: context.isLoading,
    isAuthenticated: context.isAuthenticated,
    login: context.login,
    register: context.register,
    logout: context.logout,
    updateProfile: context.updateProfile,
  };
}