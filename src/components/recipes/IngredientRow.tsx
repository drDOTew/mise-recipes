import { scaleQuantity } from "@/lib/utils";
import type { Ingredient } from "@/lib/types";

interface IngredientRowProps {
  ingredient: Ingredient;
  scaleFactor?: number;
  originalServings?: number;
}

export function IngredientRow({ ingredient, scaleFactor, originalServings }: IngredientRowProps) {
  const displayQuantity =
    scaleFactor && originalServings
      ? scaleQuantity(ingredient.quantity, originalServings, originalServings * scaleFactor)
      : ingredient.quantity;

  return (
    <li className="flex items-start gap-2">
      <span className="text-accent mt-0.5">•</span>
      <span>
        {displayQuantity && displayQuantity !== ingredient.quantity && (
          <span className="text-text-muted mr-1">{displayQuantity}</span>
        )}
        {displayQuantity && <span className="mr-1">{displayQuantity}</span>}
        {ingredient.unit && <span className="text-text-muted mr-1">{ingredient.unit}</span>}
        <span>{ingredient.name}</span>
      </span>
    </li>
  );
}