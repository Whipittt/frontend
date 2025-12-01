import DashboardLayout from "@/layouts/dashboardLayout";
import { OverviewSection } from "./sectionCards";
import { VisitorChart } from "./visitorChart";

export default function DashboardMetrics() {
  return (
    <>
      <DashboardLayout pageTitle={"Admin Dashboard"}>
        <OverviewSection />
        <VisitorChart />
      </DashboardLayout>
    </>
  );
}
