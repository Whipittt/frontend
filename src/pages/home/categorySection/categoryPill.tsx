import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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

export function CategoryPillSkeleton({
  widthClass = "w-20",
}: {
  widthClass?: string;
}) {
  return <Skeleton className={`h-7 ${widthClass} rounded-full`} />;
}
