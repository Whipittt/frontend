import MainLayout from "@/layouts/mainLayout";
import MetricsSection from "./metricsSection";
import Reminder from "./reminder";
import Timer from "./timer";
import MealSchedule from "./mealSchedule";
import PageHeaderWithAvatar from "@/components/pageHeader";
import { isPlanExpired } from "@/utils/mealplan";
import { useMemo } from "react";
import { useLatestMealplanData } from "@/hooks/useMealplanData";

export default function MyDashboard() {
  const { data, isPending, isError } = useLatestMealplanData();

  const isExpired = useMemo<boolean>(() => {
    if (!data?.week_start_date) {
      return false;
    }
    return isPlanExpired(new Date(data.week_start_date));
  }, [data]);

  const isPlan = data && !isExpired;

  const mealplan = isPlan ? data : null;

  return (
    <MainLayout className="px-2 md:px-8 md:gap-12">
      <PageHeaderWithAvatar text="My Dashboard" />

      <section className="flex flex-col gap-6">
        <MetricsSection />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Reminder
              mealplan={mealplan}
              isPending={isPending}
              isError={isError}
            />
          </div>
          <div className="md:col-span-1 h-full w-full">
            <Timer />
          </div>
        </div>

        <MealSchedule
          mealplan={mealplan}
          isPending={isPending}
          isError={isError}
        />
      </section>
    </MainLayout>
  );
}
