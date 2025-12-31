import DashboardLayout from "@/layouts/dashboardLayout";
import { SectionCards } from "./sectionCards";
import { VisitorChart } from "./visitorChart";

export default function DashboardMetrics() {
  return (
    <>
      <DashboardLayout pageTitle={"Admin Dashboard"}>
        <SectionCards />
        <VisitorChart />
      </DashboardLayout>
    </>
  );
}
