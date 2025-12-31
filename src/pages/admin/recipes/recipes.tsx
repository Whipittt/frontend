import DashboardLayout from "@/layouts/dashboardLayout";
import { OverviewSection } from "./overviewSect";
import RecipesTable from "./recipesTable";

export default function Recipes() {
  return (
    <DashboardLayout pageTitle="Recipes">
      <OverviewSection />
      <RecipesTable/>
    </DashboardLayout>
  );
}
