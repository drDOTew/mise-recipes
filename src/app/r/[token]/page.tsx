"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { RecipeHero } from "@/components/recipes/RecipeHero";
import { RecipeMeta } from "@/components/recipes/RecipeMeta";
import { TagList } from "@/components/recipes/TagList";
import { IngredientList } from "@/components/recipes/IngredientList";
import { StepsList } from "@/components/recipes/StepsList";
import { ScaleControl } from "@/components/recipes/ScaleControl";
import { Spinner } from "@/components/ui/Spinner";
import type { Recipe } from "@/lib/types";

export default function PublicRecipePage() {
  const params = useParams();
  const token = params.token as string;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await api.get<{ data: Recipe }>(endpoints.public.recipe(token));
        setRecipe(res.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <span className="text-6xl mb-6">🔍</span>
        <h1 className="font-heading text-2xl text-text-primary mb-2">
          Receta no encontrada
        </h1>
        <p className="text-text-secondary">
          Esta receta no existe o ya no está disponible.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs text-text-muted uppercase tracking-wide mb-1">
          Receta compartida
        </p>
        <RecipeHero emoji={recipe.emoji} />
        <h1 className="font-heading text-3xl mt-4">{recipe.title}</h1>
      </div>

      <RecipeMeta
        prepTime={recipe.prep_time_minutes}
        cookTime={recipe.cook_time_minutes}
        servings={recipe.servings}
        difficulty={recipe.difficulty}
      />
      {recipe.tags.length > 0 && <TagList tags={recipe.tags} className="mt-3" />}

      {recipe.description && (
        <p className="text-text-secondary leading-relaxed mt-6">{recipe.description}</p>
      )}

      <div className="mt-6 mb-4">
        <label className="text-sm text-text-secondary mb-2 block">Porciones</label>
        <ScaleControl
          value={recipe.servings * scale}
          min={1}
          max={99}
          onChange={(v) => setScale(v / recipe.servings)}
        />
      </div>

      <div className="space-y-6 mt-8">
        <IngredientList
          ingredients={recipe.ingredients}
          scaleFactor={scale}
          originalServings={recipe.servings}
        />
        <StepsList steps={recipe.steps} />
      </div>

      <footer className="mt-12 pt-6 border-t border-border text-center">
        <p className="text-sm text-text-muted">
          Hecho con <span className="text-red-400">♥</span> por Mise
        </p>
      </footer>
    </div>
  );
}
