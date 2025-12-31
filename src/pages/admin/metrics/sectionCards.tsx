import { Alert, AlertDescription } from "@/components/ui/alert";
import MetricsCard from "@/components/metricCard";
import useMetricsCache from "@/hooks/useMetrics";

export function SectionCards() {
  const { data, isLoading, isError, error } = useMetricsCache("overview");

  const totalRecipes = data?.total_recipes ?? 0;
  const activeUsers = data?.active_users ?? 0;
  const userGrowthRate = data?.user_growth_rate ?? 0;
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricsCard
          label="Total Recipe"
          value={Intl.NumberFormat("en-US").format(totalRecipes)}
          footer="Strong engagement and retention"
          loading={isLoading}
          error={isError}
        />

        <MetricsCard
          label="Active Users"
          value={Intl.NumberFormat("en-US").format(activeUsers)}
          footer="Strong engagement and retention"
          loading={isLoading}
          error={isError}
        />

        <MetricsCard
          label="User Growth Rate"
          value={Intl.NumberFormat("en-US", {
            style: "percent",
            maximumFractionDigits: 1,
          }).format((userGrowthRate || 0) / 100)}
          footer="Consistent increase in new cooks"
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
      </div>
    </div>
  );
}
