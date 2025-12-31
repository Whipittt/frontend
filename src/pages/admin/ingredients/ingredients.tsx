import DashboardLayout from "@/layouts/dashboardLayout";
import IngredientsTable from "./ingredientsTable";
import { OverviewSection } from "./overviewSect";

export default function Ingredients() {
  return (
    <DashboardLayout pageTitle="Ingredients">
      <OverviewSection />
      <IngredientsTable />
    </DashboardLayout>
  );
}
