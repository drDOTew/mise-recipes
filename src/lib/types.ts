// User
export interface User {
  id: string;
  name: string;
  email: string;
  plan: "free" | "chef";
  email_verified_at: string | null;
}

// Recipe related
export interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  unit: string | null;
  sort_order: number;
}

export interface Step {
  id: number;
  body: string;
  sort_order: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  servings: number;
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  difficulty: "easy" | "medium" | "hard" | null;
  emoji: string | null;
  image_url: string | null;
  is_public: boolean;
  share_url: string | null;
  source_url: string | null;
  ingredients: Ingredient[];
  steps: Step[];
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

// Payload types
export interface RecipePayload {
  title: string;
  description?: string | null;
  servings: number;
  prep_time_minutes?: number | null;
  cook_time_minutes?: number | null;
  difficulty?: "easy" | "medium" | "hard" | null;
  emoji?: string;
  source_url?: string | null;
  ingredients: { name: string; quantity: string; unit: string | null; sort_order: number }[];
  steps: { body: string; sort_order: number }[];
  tag_ids?: number[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// API Response types
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  next_cursor: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Filter types
export interface RecipeFilters {
  tag?: string;
  search?: string;
  sort?: string;
  cursor?: string;
}