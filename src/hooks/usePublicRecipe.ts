"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import type { Recipe } from "@/lib/types";

export function usePublicRecipe(token: string) {
  return useQuery({
    queryKey: ["public", "recipe", token],
    queryFn: async () => {
      const response = await api.get<Recipe>(endpoints.public.recipe(token));
      return response;
    },
    enabled: !!token,
  });
}