"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import type { Tag } from "@/lib/types";

export function useTags() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["tags", "all"],
    queryFn: async () => {
      const response = await api.get<{ data: Tag[] }>(endpoints.tags.list);
      return response.data;
    },
  });

  const create = useMutation({
    mutationFn: async (name: string) => {
      const response = await api.post<Tag>(endpoints.tags.create, { name });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(endpoints.tags.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  return {
    list,
    create,
    delete: remove,
  };
}