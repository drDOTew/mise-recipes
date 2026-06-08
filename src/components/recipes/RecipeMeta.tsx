import { formatTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { DIFFICULTIES } from "@/lib/constants";

interface RecipeMetaProps {
  prepTime: number | null;
  cookTime: number | null;
  servings: number;
  difficulty: "easy" | "medium" | "hard" | null;
}

export function RecipeMeta({ prepTime, cookTime, servings, difficulty }: RecipeMetaProps) {
  const totalTime = (prepTime || 0) + (cookTime || 0);
  const difficultyLabel = DIFFICULTIES.find((d) => d.value === difficulty)?.label;

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
      {totalTime > 0 && (
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formatTime(totalTime)}
        </span>
      )}
      <span className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        {servings} porciones
      </span>
      {difficulty && difficultyLabel && (
        <Badge variant="accent">{difficultyLabel}</Badge>
      )}
    </div>
  );
}