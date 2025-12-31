import { ArrowRight, ArrowUp } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";

export default function MetricsCard({
  label,
  value,
  valueBold,
  footer,
  footerArrow,
  loading,
  error,
}: {
  label: string;
  value: React.ReactNode;
  valueBold?: boolean;
  footer?: string | React.ReactNode;
  footerArrow?: "up" | "right";
  loading?: boolean;
  error?: boolean;
}) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle
          className={cn(
            "text-3xl text-primary font-normal tabular-nums @[250px]/card:text-3xl",
            valueBold ? "text-4xl font-medium" : null
          )}
        >
          {loading ? (
            <span className="inline-block h-8 w-24 animate-pulse rounded bg-muted" />
          ) : error ? (
            <span className="text-destructive">--</span>
          ) : (
            value
          )}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        {loading ? (
          <span className="inline-block h-3 w-40 animate-pulse rounded bg-muted" />
        ) : footer && footerArrow ? (
          <div className="flex text-muted-foreground text-xs gap-1 items-center">
            {footerArrow === "up" ? (
              <ArrowUp size={18} />
            ) : footerArrow === "right" ? (
              <ArrowRight size={18} />
            ) : null}
            <span>{footer}</span>
          </div>
        ) : footer ? (
          <div className="text-muted-foreground text-xs">{footer}</div>
        ) : null}
      </CardFooter>
    </Card>
  );
}
