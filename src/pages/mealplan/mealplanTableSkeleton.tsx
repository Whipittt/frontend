import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Props = {
  days?: number;
};

const MEAL_ORDER = ["breakfast", "lunch", "dinner"] as const;

export function MealplanTableSkeleton({ days = 3 }: Props) {
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
        {Array.from({ length: days }).flatMap((_, dayIndex) => {
          return MEAL_ORDER.map((mealType, mealIndex) => {
            const isFirst = mealIndex === 0;
            const isLast = mealIndex === MEAL_ORDER.length - 1;

            return (
              <TableRow
                key={`sk-day-${dayIndex}-meal-${mealType}`}
                className={cn(
                  "hover:bg-muted/0 transition-colors",
                  !isLast && "border-b-0"
                )}
              >
                {isFirst && (
                  <TableCell
                    rowSpan={MEAL_ORDER.length}
                    className="align-top md:pl-8 pl-4 py-8 font-medium"
                  >
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                )}

                <TableCell
                  className={cn(
                    "py-2 md:max-w-[200px] max-w-[140px] whitespace-nowrap overflow-hidden text-ellipsis",
                    isFirst && "pt-8",
                    isLast && "pb-8"
                  )}
                >
                  <Skeleton className="h-4 w-[220px] max-w-full" />
                </TableCell>

                <TableCell
                  className={cn(
                    "py-2 md:pr-8 pr-4 text-right",
                    isFirst && "pt-8",
                    isLast && "pb-8"
                  )}
                >
                  <div className="flex justify-end">
                    <Skeleton className="h-7 w-[84px] rounded-full" />
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
