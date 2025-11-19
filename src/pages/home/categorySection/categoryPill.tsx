import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

export function CategoryPill({
  to,
  label,
  variant = "muted",
}: {
  to: string;
  label: string;
  variant?: BadgeVariant;
}) {
  return (
    <Badge variant={variant}>
      <Link to={to}>{label}</Link>
    </Badge>
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
