"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { RecipeHero } from "./RecipeHero";
import { RecipeMeta } from "./RecipeMeta";
import { TagList } from "./TagList";
import type { Recipe } from "@/lib/types";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <Card variant="hover" padding="none" className="cursor-pointer" onClick={handleClick}>
      <RecipeHero emoji={recipe.emoji} />
      <div className="p-4">
        <h3 className="font-heading text-lg text-text-primary mb-2">{recipe.title}</h3>
        <RecipeMeta
          prepTime={recipe.prep_time_minutes}
          cookTime={recipe.cook_time_minutes}
          servings={recipe.servings}
          difficulty={recipe.difficulty}
        />
        {recipe.tags.length > 0 && <TagList tags={recipe.tags} className="mt-3" />}
      </div>
    </Card>
  );
}