import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1, "Requerido"),
  quantity: z.string().optional(),
  unit: z.string().nullable().optional(),
  sort_order: z.number(),
});

export const stepSchema = z.object({
  body: z.string().min(1, "Requerido"),
  sort_order: z.number(),
});

export const createRecipeSchema = z.object({
  title: z.string().min(2, "Mínimo 2 caracteres"),
  description: z.string().max(1000).optional().nullable(),
  servings: z.number().min(1).max(99),
  prep_time_minutes: z.number().min(1).max(999).optional().nullable(),
  cook_time_minutes: z.number().min(1).max(999).optional().nullable(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional().nullable(),
  source_url: z.string().url("URL inválida").optional().nullable(),
  ingredients: z.array(ingredientSchema).min(1, "Mínimo 1 ingrediente"),
  steps: z.array(stepSchema).min(1, "Mínimo 1 paso"),
  tag_ids: z.array(z.number()).optional(),
});