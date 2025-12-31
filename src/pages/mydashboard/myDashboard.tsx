import MainLayout from "@/layouts/mainLayout";
import MetricsSection from "./metricsSection";
import Reminder from "./reminder";
import Timer from "./timer";
import MealSchedule from "./mealSchedule";
import PageHeaderWithAvatar from "@/components/pageHeader";

export default function MyDashboard() {
  return (
    <MainLayout className="px-2 md:px-8 md:gap-12">
      <PageHeaderWithAvatar text="My Dashboard" />

      <section className="flex flex-col gap-6">
        <MetricsSection />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Reminder />
          </div>
          <div className="md:col-span-1 h-full w-full">
            <Timer />
          </div>
        </div>

        <MealSchedule />
      </section>
    </MainLayout>
  );
}
