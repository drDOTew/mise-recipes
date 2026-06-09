"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Topbar } from "@/components/layout/Topbar";
import { RecipeHero } from "@/components/recipes/RecipeHero";
import { RecipeMeta } from "@/components/recipes/RecipeMeta";
import { TagList } from "@/components/recipes/TagList";
import { IngredientList } from "@/components/recipes/IngredientList";
import { StepsList } from "@/components/recipes/StepsList";
import { ScaleControl } from "@/components/recipes/ScaleControl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { useRecipe } from "@/hooks/useRecipe";
import { useRecipes } from "@/hooks/useRecipes";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: recipe, isLoading, error } = useRecipe(id);
  const { share, delete: deleteRecipe } = useRecipes();
  const [scale, setScale] = useState(1);
  const [isSharing, setIsSharing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-4">Receta no encontrada</p>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Volver al dashboard
        </Button>
      </div>
    );
  }

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const result = await share.mutateAsync(id);
      alert(`Link compartido: ${result.share_url}`);
    } catch {
      alert("Error al generar link");
    } finally {
      setIsSharing(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteRecipe.mutateAsync(id);
      router.push("/dashboard");
    } catch {
      alert("Error al eliminar la receta");
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Topbar title="">
        <Button variant="ghost" onClick={() => router.push(`/recipes/${id}/edit`)}>
          Editar
        </Button>
      </Topbar>

      <PageHeader backHref="/dashboard" backLabel="← Volver a mis recetas" />

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Main content */}
        <div className="space-y-6">
          <RecipeHero emoji={recipe.emoji} />

          <div>
            <h1 className="font-heading text-3xl text-text-primary mb-3">{recipe.title}</h1>
            <RecipeMeta
              prepTime={recipe.prep_time_minutes}
              cookTime={recipe.cook_time_minutes}
              servings={recipe.servings}
              difficulty={recipe.difficulty}
            />
            {recipe.tags.length > 0 && <TagList tags={recipe.tags} className="mt-3" />}
          </div>

          {recipe.description && (
            <p className="text-text-secondary leading-relaxed">{recipe.description}</p>
          )}

          <div className="space-y-6">
            <IngredientList
              ingredients={recipe.ingredients}
              scaleFactor={scale}
              originalServings={recipe.servings}
            />
            <StepsList steps={recipe.steps} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card padding="md" className="sticky top-24">
            <h3 className="font-heading text-lg mb-3">Ingredientes</h3>
            <ul className="space-y-2 mb-4">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-accent">•</span>
                  <span>
                    {ing.quantity} {ing.unit} {ing.name}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-border pt-4 mb-4">
              <label className="text-sm text-text-secondary mb-2 block">Porciones</label>
              <ScaleControl
                value={recipe.servings * scale}
                min={1}
                max={99}
                onChange={(v) => setScale(v / recipe.servings)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleShare} isLoading={isSharing}>
                Compartir
              </Button>
              <Button variant="ghost" onClick={() => alert("Favoritos disponibles próximamente ✨")}>❤️</Button>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <Button
                variant="ghost"
                className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Eliminar receta
              </Button>
            </div>

            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <Card padding="md" className="max-w-sm mx-4">
                  <h3 className="font-heading text-lg mb-2">¿Eliminar receta?</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Esta acción no se puede deshacer. La receta "{recipe.title}" será eliminada permanentemente.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isDeleting}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                      onClick={handleDelete}
                      isLoading={isDeleting}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}