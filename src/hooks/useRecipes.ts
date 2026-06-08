"use client";

import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import type { Recipe, RecipeFilters, RecipePayload } from "@/lib/types";

export function useRecipes() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["recipes", "list"],
    queryFn: async () => {
      const response = await api.get<{ data: Recipe[] }>(endpoints.recipes.list);
      return response.data;
    },
  });

  const listWithFilters = (filters: RecipeFilters) => ({
    queryKey: ["recipes", "list", filters],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (filters.tag) params.tag = filters.tag;
      if (filters.search) params.search = filters.search;
      if (filters.cursor) params.cursor = filters.cursor;

      const response = await api.get<{ data: Recipe[]; next_cursor: string | null }>(
        endpoints.recipes.list,
        params
      );
      return response;
    },
  });

  const infiniteList = useInfiniteQuery({
    queryKey: ["recipes", "infinite"],
    queryFn: async ({ pageParam }) => {
      const params: Record<string, string> = {};
      if (pageParam) params.cursor = pageParam;

      const response = await api.get<{ data: Recipe[]; next_cursor: string | null }>(
        endpoints.recipes.list,
        params
      );
      return response;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
  });

  const create = useMutation({
    mutationFn: async (data: RecipePayload) => {
      const response = await api.post<Recipe>(endpoints.recipes.create, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: RecipePayload }) => {
      const response = await api.patch<Recipe>(endpoints.recipes.update(id), data);
      return response;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipes", "detail", id] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(endpoints.recipes.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  const share = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post<{ share_url: string }>(endpoints.recipes.share(id));
      return response;
    },
  });

  const unshare = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(endpoints.recipes.unshare(id));
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["recipes", "detail", id] });
    },
  });

  return {
    list,
    listWithFilters,
    infiniteList,
    create,
    update,
    delete: remove,
    share,
    unshare,
  };
}
