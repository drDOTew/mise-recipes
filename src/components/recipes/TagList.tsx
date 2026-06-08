import { Badge } from "@/components/ui/Badge";
import type { Tag } from "@/lib/types";

interface TagListProps {
  tags: Tag[];
}

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Badge key={tag.id} variant="default">
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}