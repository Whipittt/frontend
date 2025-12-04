import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";


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
  className,
}: {
  label: string;
  onRemove?: (label: string) => void;
  className?: string;
}) {
  return (
    <Badge
      variant="active"
      className={cn(
        "inline-flex items-center gap-1 select-none transition-all",
        className
      )}
    >
      <span>{label}</span>
      <button
        type="button"
        aria-label={`Remove ${label}`}
        onClick={() => onRemove?.(label)}
        className="p-0 inline-flex items-center justify-center hover:opacity-75 transition-opacity"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </Badge>
  );
}

export function CategoryPillSkeleton() {
  return <Skeleton className={`h-7 w-20 shrink-0 rounded-full`} />;
}
