import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import MainLayout from "@/layouts/mainLayout";
import EditButton from "../profile/editButton";
import { MealplanTable } from "./malplanTable";
import PageHeaderWithAvatar from "@/components/pageHeader";

export default function MealPlan() {
  return (
    <MainLayout className="px-2 md:px-8 md:gap-12">
      <PageHeaderWithAvatar text="Your Weekly Meal Schedule" />

      <section>
        <Card className="rounded-3xl py-6">
          <CardHeader className="flex flex-row justify-between items-start px-8">
            <span className="font-medium">Meal Schedule</span>
            <EditButton className="!mt-0 rounded-full" />
          </CardHeader>

          <CardDescription className="mt-4">
            <MealplanTable />
          </CardDescription>
        </Card>
      </section>
    </MainLayout>
  );
}
