"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { RecipeCard } from "./RecipeCard";
import { Button } from "@/components/ui/Button";
import type { Recipe } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RecipeGridProps {
  recipes: Recipe[];
  isLoading?: boolean;
  onAddClick?: () => void;
}

export function RecipeGrid({ recipes, isLoading, onAddClick }: RecipeGridProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-video rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <Card
        variant="hover"
        padding="lg"
        className="border-dashed cursor-pointer"
        onClick={onAddClick}
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <span className="text-4xl mb-3">+</span>
          <p className="text-text-secondary font-medium">Agregar receta</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      {/* Add recipe card */}
      <Card
        variant="hover"
        padding="lg"
        className="border-dashed cursor-pointer min-h-[200px]"
        onClick={onAddClick}
      >
        <div className="flex flex-col items-center justify-center h-full py-8 text-center">
          <span className="text-4xl mb-3">+</span>
          <p className="text-text-secondary font-medium">Nueva receta</p>
        </div>
      </Card>
    </div>
  );
}