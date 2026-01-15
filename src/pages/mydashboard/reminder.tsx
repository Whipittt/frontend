import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { MealPlanOut } from "@/types";
import { upcomingMealFromTime } from "@/utils/mealplan";
import { Dot } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type ReminderProps = {
  mealplan: MealPlanOut | null;
  isPending: boolean;
  isError: boolean;
};

function Empty({
  message,
  destructive,
}: {
  message: string;
  destructive?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className={
          destructive
            ? "text-destructive"
            : "text-sm md:text-left text-center text-muted-foreground"
        }
      >
        {message}
      </span>
    </div>
  );
}

export default function Reminder({
  mealplan,
  isPending,
  isError,
}: ReminderProps) {
  const upcomingMeal = useMemo(() => {
    if (mealplan) {
      return upcomingMealFromTime(mealplan);
    }
    return undefined;
  }, [mealplan]);

  const hasActiveMealplan = upcomingMeal !== undefined;

  const isEmpty = !isPending && !isError && hasActiveMealplan && !upcomingMeal;

  const showFooter = !isPending && !isError && !!upcomingMeal;

  return (
    <Card className="md:min-h-full flex flex-col">
      <CardHeader>
        <span className="text-sm">Reminders</span>
      </CardHeader>

      <CardContent>
        {isPending && (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-9 w-20 rounded-full" />
            <Skeleton className="h-8 w-full max-w-[90%] rounded-md" />
          </div>
        )}

        {!isPending && isError && (
          <Empty destructive message="Failed to load reminders" />
        )}

        {!isPending && !isError && !hasActiveMealplan && (
          <Empty message="No meal plan yet, Add a meal plan to see reminders here." />
        )}

        {isEmpty && (
          <Empty message="No upcoming meals, Add a meal to see reminders here." />
        )}

        {!isPending && !isError && upcomingMeal && (
          <div className="flex flex-col gap-4">
            <Badge
              variant="secondary"
              className="!text-sm px-2.5 py-2 font-normal w-fit"
            >
              {upcomingMeal.type}
            </Badge>

            <span className="text-2xl font-medium truncate">
              <Link to={`/recipes/${upcomingMeal.id}`}>
                {upcomingMeal.title}
              </Link>
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className={cn("mt-auto", showFooter ? "flex" : "hidden")}>
        <div className="w-full flex justify-between text-xs">
          <div className="flex items-center gap-1.5 text-primary">
            <Dot className="w-1 h-1 shrink-0" strokeWidth={22} />
            <span>Upcoming meals</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 21H21M3 18H21"
                stroke="#888888"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4.5 12.5C4.5 8.358 7.858 5 12 5C16.142 5 19.5 8.358 19.5 12.5V18H4.5V12.5Z"
                stroke="#888888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 12.5V14.5"
                stroke="#888888"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M14 5V4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2C11.4696 2 10.9609 2.21071 10.5858 2.58579C10.2107 2.96086 10 3.46957 10 4V5"
                stroke="#888888"
                strokeWidth="2"
              />
            </svg>
            <span>Start cooking immediately</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
