"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Topbar } from "@/components/layout/Topbar";
import { PageHeader } from "@/components/layout/PageHeader";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { useRecipe } from "@/hooks/useRecipe";
import { useRecipes } from "@/hooks/useRecipes";
import type { RecipePayload } from "@/lib/types";

export default function EditRecipePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: recipe, isLoading } = useRecipe(id);
  const { update } = useRecipes();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: RecipePayload) => {
    setIsSubmitting(true);
    try {
      await update.mutateAsync({ id, data });
      router.push(`/recipes/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Error al actualizar la receta");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-4">Receta no encontrada</p>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="">
        <button
          onClick={() => router.push(`/recipes/${id}`)}
          className="text-text-secondary hover:text-text-primary"
        >
          Cancelar
        </button>
      </Topbar>

      <PageHeader title="Editar Receta" backHref={`/recipes/${id}`} backLabel="← Volver a la receta" />

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Form */}
        <div>
          <RecipeForm
            initialValues={recipe}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </div>

        {/* Preview */}
        <div className="hidden lg:block">
          <Card padding="md" className="sticky top-24">
            <h3 className="font-heading text-lg mb-4">Preview</h3>
            <div className="bg-accent-bg rounded-lg p-8 text-center text-4xl mb-4">🍝</div>
            <h4 className="font-heading text-lg">{recipe.title}</h4>
            <p className="text-sm text-text-secondary mt-1">
              {recipe.servings} porciones • {recipe.difficulty || "Fácil"}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}