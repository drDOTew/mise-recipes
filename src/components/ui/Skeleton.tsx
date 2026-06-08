import { Card } from "@/components/ui/Card";

export function RecipeCardSkeleton() {
  return (
    <Card padding="none">
      <div className="animate-pulse">
        <div className="bg-gray-200 aspect-video rounded-t-lg" />
        <div className="p-4 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="flex gap-1">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function RecipeDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="bg-gray-200 aspect-video rounded-lg" />
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}