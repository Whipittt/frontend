import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { MealPlanDayOut } from "@/types";
import { NUMBER_TO_DAY } from "@/utils/mealplan";

const MEAL_ORDER = ["breakfast", "lunch", "dinner"] as const;

type MealplanTableProps = {
  meals?: MealPlanDayOut[];
};

export function MealplanTable({ meals }: MealplanTableProps) {
  const safeMeals = Array.isArray(meals) ? meals : [];

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-t">
          <TableHead className="md:pl-8 pl-4 py-4">Day</TableHead>
          <TableHead>Recipe</TableHead>
          <TableHead className="text-right pr-4 md:pr-[40px]">Meal</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {safeMeals.flatMap((day, dayIndex) => {
          const dayName = NUMBER_TO_DAY[day?.day_of_week] ?? "—";
          const dayMealsObj = day?.meals ?? {};

          const dayMeals = MEAL_ORDER.flatMap((type) => {
            const meal = dayMealsObj[type];
            if (!meal) return [];
            // keep type for display and uniqueness
            return [{ ...meal, type }];
          });

          if (dayMeals.length === 0) return [];

          // Prefer a stable unique day identifier if your API provides one.
          // Fallbacks are still here, but avoid dayIndex as much as possible.
          const dayKey = String(
            // @ts-expect-error: depends on your API shape
            day?.id ?? day?.date ?? day?.day_of_week ?? `day-${dayIndex}`
          );

          return dayMeals.map((meal, mealIndex) => {
            const isFirst = mealIndex === 0;
            const isLast = mealIndex === dayMeals.length - 1;

            const rowKey = `${dayKey}-${meal.id}-${meal.type}`;

            return (
              <TableRow
                key={rowKey}
                className={cn(
                  "hover:bg-muted/0 transition-colors",
                  !isLast && "border-b-0"
                )}
              >
                {isFirst && (
                  <TableCell
                    rowSpan={dayMeals.length}
                    className="align-top md:pl-8 pl-4 py-8 font-medium"
                  >
                    {dayName}
                  </TableCell>
                )}

                <TableCell
                  className={cn(
                    "py-2 md:max-w-[200px] max-w-[140px] whitespace-nowrap overflow-hidden text-ellipsis",
                    isFirst && "pt-8",
                    isLast && "pb-8"
                  )}
                >
                  <Link to={meal?.id}>{meal.title ?? "Untitled recipe"}</Link>
                </TableCell>

                <TableCell
                  className={cn(
                    "py-2 md:pr-8 pr-4 text-right",
                    isFirst && "pt-8",
                    isLast && "pb-8"
                  )}
                >
                  <div className="flex justify-end">
                    <Badge
                      variant="secondary"
                      className="text-xs py-2 font-normal capitalize md:min-w-[74px] flex items-center justify-center w-fit"
                    >
                      {meal?.type ?? "meal"}
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            );
          });
        })}
      </TableBody>
    </Table>
  );
}
