import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { Tag } from "@/lib/types";

interface TagListProps {
  tags: Tag[];
  className?: string;
}

export function TagList({ tags, className }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <Badge key={tag.id} variant="default">
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}