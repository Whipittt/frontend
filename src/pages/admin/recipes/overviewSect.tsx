import { Alert, AlertDescription } from "@/components/ui/alert";
import MetricsCard from "@/components/metricCard";
import useMetricsCache from "@/hooks/useMetrics";

export function OverviewSection() {
  const { data, isLoading, isError, error } = useMetricsCache("recipes");

  const totalRecipes = data?.total_recipes ?? 0;
  const averageTime = data?.average_recipe_time ?? 0;
  const averageRecipeRating = data?.average_recipe_rating ?? 0;

  return (
    <div className="space-y-4">
      {isError && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertDescription>
            {(error as any)?.message || "Failed to load metrics"}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricsCard
          label="Total Recipe"
          value={Intl.NumberFormat("en-US").format(totalRecipes)}
          footer="Strong engagement and retention"
          loading={isLoading}
          error={isError}
        />

        <MetricsCard
          label="Average Rating"
          value={Intl.NumberFormat("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          }).format(averageRecipeRating)}
          footer="Maintaining high user satisfaction"
          loading={isLoading}
          error={isError}
        />

        <MetricsCard
          label="Average time"
          value={Intl.NumberFormat("en-US").format(averageTime)}
          footer="Consistent increase in new cooks"
          loading={isLoading}
          error={isError}
        />
      </div>
    </div>
  );
}
