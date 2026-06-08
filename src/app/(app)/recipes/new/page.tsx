"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/layout/Topbar";
import { PageHeader } from "@/components/layout/PageHeader";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { Card } from "@/components/ui/Card";
import { RecipeHero } from "@/components/recipes/RecipeHero";
import { useRecipes } from "@/hooks/useRecipes";
import type { RecipePayload } from "@/lib/types";

export default function NewRecipePage() {
  const router = useRouter();
  const { create } = useRecipes();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: RecipePayload) => {
    setIsSubmitting(true);
    try {
      const recipe = await create.mutateAsync(data);
      router.push(`/recipes/${recipe.id}`);
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Error al crear la receta");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Topbar title="">
        <button
          onClick={() => router.back()}
          className="text-text-secondary hover:text-text-primary"
        >
          Cancelar
        </button>
      </Topbar>

      <PageHeader title="Nueva Receta" />

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Form */}
        <div>
          <RecipeForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </div>

        {/* Preview */}
        <div className="hidden lg:block">
          <Card padding="md" className="sticky top-24">
            <h3 className="font-heading text-lg mb-4">Preview</h3>
            <div className="bg-accent-bg rounded-lg p-8 text-center text-4xl mb-4">🍝</div>
            <h4 className="font-heading text-lg">Tu receta</h4>
            <p className="text-sm text-text-secondary mt-1">4 porciones • Fácil</p>
          </Card>
        </div>
      </div>
    </div>
  );
}