import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = "📭",
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Card padding="lg" className="text-center">
      <span className="text-4xl mb-4 block">{icon}</span>
      <h3 className="font-heading text-lg text-text-primary mb-2">{title}</h3>
      {description && (
        <p className="text-text-secondary text-sm mb-4">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}