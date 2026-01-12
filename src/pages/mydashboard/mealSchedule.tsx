import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { MealplanTable } from "../mealplan/malplanTable";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { dayScheduleFromMeaplan, isPlanExpired } from "@/utils/mealplan";
import { useLatestMealplanData } from "@/hooks/useMealplanData";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { MealplanTableSkeleton } from "../mealplan/mealplanTableSkeleton";

export default function MealSchedule() {
  const navigate = useNavigate();

  const { data: mealplan, isPending, isError } = useLatestMealplanData();

  const days = mealplan?.days ?? [];

  const isPlanEmpty = !isPending && !isError && days.length === 0;

  const isExpired = useMemo<boolean>(() => {
    if (!mealplan?.week_start_date) {
      return false;
    }
    return isPlanExpired(new Date(mealplan.week_start_date));
  }, [mealplan]);

  const todaySchedule = useMemo(() => {
    if (mealplan && !isPlanEmpty) {
      return dayScheduleFromMeaplan(mealplan);
    }
    return null;
  }, [mealplan, isPlanEmpty]);

  const isScheduleEmpty = !isPending && !isError && todaySchedule === null;

  return (
    <Card className="rounded-3xl py-6">
      <CardHeader className="flex flex-row justify-between items-start px-8">
        <span className="font-medium">Meal Schedule</span>

        {!isPending && !isError && !isPlanEmpty && !isExpired && (
          <Button
            className="rounded-full font-medium"
            onClick={() => navigate("/mealplan")}
          >
            View <ArrowRight />
          </Button>
        )}
      </CardHeader>

      <CardDescription className="mt-4">
        {isPending && <MealplanTableSkeleton days={1} />}

        {!isPending && isExpired && (
          <div className="px-4 md:px-8 py-6 text-sm flex flex-col gap-4 items-center text-muted-foreground">
            <span>
              No meal plan for this week yet. Create one to see your weekly
              schedule.
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent"
              onClick={() => navigate("/mealplan/new")}
            >
              Create meal plan
            </Button>
          </div>
        )}

        {!isPending && !isPlanEmpty && isScheduleEmpty && (
          <div className="px-4 md:px-8 py-6 text-sm flex flex-col gap-4 items-center text-muted-foreground">
            <span>
              No schedule for today. Add one to see your daily schedule.
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent"
              onClick={() => navigate(`/mealplan/${mealplan.id}`)}
            >
              Update meal plan
            </Button>
          </div>
        )}

        {!isPending && isPlanEmpty && (
          <div className="px-4 md:px-8 py-6 text-sm flex flex-col gap-4 items-center text-muted-foreground">
            <span>
              No meal plan yet. Create one to see your weekly schedule.
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent"
              onClick={() => navigate("/mealplan/new")}
            >
              Create meal plan
            </Button>
          </div>
        )}

        {!isPending &&
          !isError &&
          !isPlanEmpty &&
          !isExpired &&
          todaySchedule && <MealplanTable meals={[todaySchedule]} />}
      </CardDescription>
    </Card>
  );
}
