import { Alert, AlertDescription } from "@/components/ui/alert";
import MetricsCard from "@/components/metricCard";
import useMetricsCache from "@/hooks/useMetrics";

export function OverviewSection() {
  const { data, isLoading, isError, error } = useMetricsCache("users");

  const totalRecipes = data?.total_users ?? 0;
  const activeUsers = data?.active_users ?? 0;
  const adminUsers = data?.admin_users ?? 0;
  const userGrowthRate = data?.user_growth_rate ?? 0;

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
          label="Total Users"
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
          label="Admin Users"
          value={Intl.NumberFormat("en-US").format(adminUsers)}
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
      </div>
    </div>
  );
}
