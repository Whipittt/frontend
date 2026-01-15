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

function Empty({
  message,
  destructive,
  button,
}: {
  message: string;
  destructive?: boolean;
  button?: {
    label: string;
    onClick: () => void;
  };
}) {
  return (
    <div className="px-4 md:px-8 py-6 text-sm flex flex-col gap-4 items-center text-muted-foreground">
      <span className={destructive ? "text-destructive" : ""}>{message}</span>
      {button && (
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent"
          onClick={button.onClick}
        >
          {button.label}
        </Button>
      )}
    </div>
  );
}

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
    <Card className="md:py-6">
      <CardHeader className="flex flex-row justify-between items-center p-4 md:px-8 md:pt-0">
        <span className="font-medium">Meal Schedule</span>

        {!isPending && !isError && (
          <Button
            className="rounded-full font-medium"
            onClick={() => navigate("/mealplan")}
            size="sm"
          >
            View <ArrowRight />
          </Button>
        )}
      </CardHeader>

      <CardDescription className="mt-4">
        {!isPending && isError && (
          <Empty destructive message="Failed to load meal schedule" />
        )}

        {!isError && isPending && <MealplanTableSkeleton days={1} />}

        {!isError && !isPending && !hasActiveMealplan && (
          <Empty
            message="No meal plan yet. Create one to see your weekly schedule."
            button={{
              label: "Create meal plan",
              onClick: () => navigate("/mealplan/new"),
            }}
          />
        )}

        {!isError && isScheduleEmpty && (
          <Empty
            message="No schedule for today. Add one to see your daily schedule."
            button={{
              label: "Update meal plan",
              onClick: () => navigate(`/mealplan/${mealplan?.id}`),
            }}
          />
        )}

        {!isError && !isPending && todaySchedule && (
          <>
            <MealplanTable meals={[todaySchedule]} />
            <hr />
          </>
        )}
      </CardDescription>
    </Card>
  );
}
