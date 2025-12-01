import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

export function CategoryPill({
  label,
  variant = "muted",
  onActive
}: {
  label: string;
  variant?: BadgeVariant;
  onActive?: () => void
}) {
  return (
    <button onClick={() => onActive?.()}>
      <Badge variant={variant}>{label}</Badge>
    </button>
  );
}

export function PillWithClose({
  label,
  onRemove,
}: {
  label: string;
  onRemove?: (label: string) => void;
}) {
  return (
    <Badge
      variant="active"
      className="inline-flex items-center gap-1 select-none"
    >
      <span>{label}</span>
      <button
        type="button"
        aria-label={`Remove ${label}`}
        onClick={() => onRemove?.(label)}
        className="p-0 inline-flex items-center justify-center"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </Badge>
  );
}

export function CategoryPillSkeleton({
  widthClass = "w-20",
}: {
  widthClass?: string;
}) {
  return <Skeleton className={`h-7 ${widthClass} rounded-full`} />;
}
