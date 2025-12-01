import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function MetricCard({
  label,
  value,
  footer,
  loading,
  error,
}: {
  label: string;
  value: React.ReactNode;
  footer?: string | React.ReactNode;
  loading?: boolean;
  error?: boolean;
}) {
  return (
    <Card className="@container/card rounded-3xl">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl text-secondary font-normal tabular-nums @[250px]/card:text-3xl">
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
        ) : footer ? (
          <div className="text-muted-foreground text-xs">{footer}</div>
        ) : null}
      </CardFooter>
    </Card>
  );
}
