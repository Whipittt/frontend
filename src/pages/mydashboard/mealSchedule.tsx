import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { MealplanTable } from "../mealplan/malplanTable";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MealplanTableSkeleton } from "../mealplan/mealplanTableSkeleton";
import { useMemo } from "react";
import { dayScheduleFromMeaplan } from "@/utils/mealplan";
import type { MealPlanOut } from "@/types";

type MealScheduleProps = {
  mealplan: MealPlanOut | null;
  isPending: boolean;
  isError: boolean;
};

export default function MealSchedule({
  mealplan,
  isPending,
  isError,
}: MealScheduleProps) {
  const navigate = useNavigate();

  const todaySchedule = useMemo(() => {
    if (mealplan) return dayScheduleFromMeaplan(mealplan);
    return undefined;
  }, [mealplan]);

  const hasActiveMealplan = todaySchedule !== undefined;
  const isScheduleEmpty =
    !isPending && !isError && hasActiveMealplan && todaySchedule === null;

  return (
    <Card className="rounded-3xl py-6">
      <CardHeader className="flex flex-row justify-between items-start px-8">
        <span className="font-medium">Meal Schedule</span>

        {!isPending && !isError && (
          <Button
            className="rounded-full font-medium"
            onClick={() => navigate("/mealplan")}
          >
            View <ArrowRight />
          </Button>
        )}
      </CardHeader>

      <CardDescription className="mt-4">
        {!isPending && isError && (
          <div className="px-4 md:px-8 py-6 flex flex-col gap-2">
            <span className="text-sm text-destructive">
              Failed to load meal schedule
            </span>
          </div>
        )}

        {!isError && isPending && <MealplanTableSkeleton days={1} />}

        {!isError && !isPending && !hasActiveMealplan && (
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

        {!isError && isScheduleEmpty && (
          <div className="px-4 md:px-8 py-6 text-sm flex flex-col gap-4 items-center text-muted-foreground">
            <span>
              No schedule for today. Add one to see your daily schedule.
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent"
              onClick={() => navigate(`/mealplan/${mealplan?.id}`)}
            >
              Update meal plan
            </Button>
          </div>
        )}

        {!isError && !isPending && todaySchedule && (
          <MealplanTable meals={[todaySchedule]} />
        )}
      </CardDescription>
    </Card>
  );
}
