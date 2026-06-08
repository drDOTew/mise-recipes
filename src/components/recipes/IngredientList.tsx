import { Card } from "@/components/ui/Card";
import { IngredientRow } from "./IngredientRow";
import type { Ingredient } from "@/lib/types";

interface IngredientListProps {
  ingredients: Ingredient[];
  scaleFactor?: number;
  originalServings?: number;
}

export function IngredientList({ ingredients, scaleFactor, originalServings }: IngredientListProps) {
  return (
    <Card padding="md">
      <h3 className="font-heading text-lg mb-3">Ingredientes</h3>
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <IngredientRow
            key={`${ingredient.id}-${index}`}
            ingredient={ingredient}
            scaleFactor={scaleFactor}
            originalServings={originalServings}
          />
        ))}
      </ul>
    </Card>
  );
}