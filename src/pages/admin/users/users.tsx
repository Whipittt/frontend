import DashboardLayout from "@/layouts/dashboardLayout";
import UserTable from "./usersTable";
import { OverviewSection } from "./sectionCards";

export default function Users() {
  return (
    <>
      <DashboardLayout pageTitle="Users">
        <OverviewSection/>
        <UserTable />
      </DashboardLayout>
    </>
  );
}
