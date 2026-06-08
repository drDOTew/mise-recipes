"use client";

import { useParams } from "next/navigation";
import { RecipeHero } from "@/components/recipes/RecipeHero";
import { RecipeMeta } from "@/components/recipes/RecipeMeta";
import { TagList } from "@/components/recipes/TagList";
import { IngredientList } from "@/components/recipes/IngredientList";
import { StepsList } from "@/components/recipes/StepsList";
import { Spinner } from "@/components/ui/Spinner";
import { Card } from "@/components/ui/Card";
import { usePublicRecipe } from "@/hooks/usePublicRecipe";

export default function PublicRecipePage() {
  const params = useParams();
  const token = params.token as string;
  const { data: recipe, isLoading, error } = usePublicRecipe(token);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <Card padding="lg" className="max-w-md text-center">
          <h1 className="font-heading text-2xl mb-4">Receta no encontrada</h1>
          <p className="text-text-secondary">
            Esta receta ya no está disponible o el link es inválido.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Hero */}
        <div className="bg-accent-bg rounded-lg p-12 text-center text-6xl mb-8">
          🍝
        </div>

        {/* Title and meta */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-text-primary mb-3">{recipe.title}</h1>
          <RecipeMeta
            prepTime={recipe.prep_time_minutes}
            cookTime={recipe.cook_time_minutes}
            servings={recipe.servings}
            difficulty={recipe.difficulty}
          />
          {recipe.tags.length > 0 && (
            <div className="flex justify-center mt-3">
              <TagList tags={recipe.tags} />
            </div>
          )}
        </div>

        {/* Description */}
        {recipe.description && (
          <p className="text-text-secondary text-center mb-8 leading-relaxed">
            {recipe.description}
          </p>
        )}

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="font-heading text-xl text-text-primary mb-4">Ingredientes</h2>
          <Card padding="md">
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>
                    {ing.quantity} {ing.unit} {ing.name}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Steps */}
        <div className="mb-12">
          <h2 className="font-heading text-xl text-text-primary mb-4">Pasos</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <p className="flex-1 leading-relaxed pt-1">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-text-muted text-sm">
            Receta creada con{" "}
            <a href="/" className="text-accent hover:underline">
              Mise
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}