"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import type { Recipe } from "@/lib/types";

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ["recipes", "detail", id],
    queryFn: async () => {
      const response = await api.get<Recipe>(endpoints.recipes.detail(id));
      return response;
    },
    enabled: !!id,
  });
}