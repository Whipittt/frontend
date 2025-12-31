import { Alert, AlertDescription } from "@/components/ui/alert";
import MetricsCard from "@/components/metricCard";
import useMetricsCache from "@/hooks/useMetrics";

export function OverviewSection() {
  const { data, isLoading, isError, error } = useMetricsCache("ingredients");

  const totalRecipes = data?.total_ingredients ?? 0;
  const inUse = data?.in_use ?? 0;

  return (
    <div className="space-y-4">
      {isError && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertDescription>
            {(error as any)?.message || "Failed to load metrics"}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricsCard
          label="Total Ingredients"
          value={Intl.NumberFormat("en-US").format(totalRecipes)}
          footer="Strong engagement and retention"
          loading={isLoading}
          error={isError}
        />

        <MetricsCard
          label="In Use"
          value={Intl.NumberFormat("en-US").format(inUse)}
          footer="Strong engagement and retention"
          loading={isLoading}
          error={isError}
        />
      </div>
    </div>
  );
}
