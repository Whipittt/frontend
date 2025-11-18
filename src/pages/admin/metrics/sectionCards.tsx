import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import { MetricsAPI } from "@/api/admin/metrics";

interface MetricsResponse {
  total_recipes: number;
  active_users: number;
  user_growth_rate: number; // percentage in 0..100
  average_recipe_rating: number; // rating score (e.g., out of 5)
}

function useMetrics() {
  const { authFetch } = useAuth();
  const af = authFetch;

  const fetcher = React.useCallback(async () => {
    const api: any = MetricsAPI;
    const fn =
      api?.fetcmetrics ?? api?.fetchMetrics ?? api?.getMetrics ?? api?.metrics;
    if (typeof fn !== "function") {
      throw new Error("metricsAPI.fetcher not found");
    }
    const res = await fn(af);
    return (res?.data ?? res) as MetricsResponse;
  }, [af]);

  return useQuery<MetricsResponse>({
    queryKey: ["metrics", "dashboard"],
    queryFn: fetcher,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

function MetricCard({
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

export function SectionCards() {
  const { data, isLoading, isError, error, refetch, isFetching } = useMetrics();

  const totalRecipes = data?.total_recipes ?? 0;
  const activeUsers = data?.active_users ?? 0;
  const userGrowthRate = data?.user_growth_rate ?? 0; 
  const averageRecipeRating = data?.average_recipe_rating ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-3 py-1.5 text-sm rounded-md border bg-muted hover:bg-secondary/10 disabled:opacity-50"
        >
          {isFetching ? "Refreshing..." : "Refresh Metrics"}
        </button>
        {isError && (
          <span className="text-xs text-destructive">
            {(error as any)?.message || "Failed to load metrics"}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Recipe"
          value={Intl.NumberFormat("en-US").format(totalRecipes)}
          footer="—"
          loading={isLoading}
          error={isError}
        />

        <MetricCard
          label="Active Users"
          value={Intl.NumberFormat("en-US").format(activeUsers)}
          footer="Strong engagement and retention"
          loading={isLoading}
          error={isError}
        />

        <MetricCard
          label="User Growth Rate"
          value={Intl.NumberFormat("en-US", {
            style: "percent",
            maximumFractionDigits: 1,
          }).format((userGrowthRate || 0) / 100)}
          footer="Consistent increase in new cooks"
          loading={isLoading}
          error={isError}
        />

        <MetricCard
          label="Average Rating"
          value={Intl.NumberFormat("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          }).format(averageRecipeRating)}
          footer="Maintaining high user satisfaction"
          loading={isLoading}
          error={isError}
        />
      </div>
    </div>
  );
}
