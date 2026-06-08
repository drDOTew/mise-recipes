interface RecipeHeroProps {
  emoji?: string | null;
  className?: string;
}

export function RecipeHero({ emoji, className }: RecipeHeroProps) {
  return (
    <div
      className={`w-full aspect-video bg-accent-bg rounded-lg flex items-center justify-center text-6xl ${className || ""}`}
    >
      {emoji || "🍽️"}
    </div>
  );
}