import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecipeCombobox } from "./recipeCombobox";
import type { MealPlanDay, MealType, RecipeSupBrief } from "@/types";
import { Fragment, useMemo, type SetStateAction } from "react";
import { getMealplanValidDays, NUMBER_TO_DAY } from "@/utils/mealplan";
import { cn } from "@/lib/utils";

export default function MealplanForm({
  mealplanPayload,
  setMealplanPayload,
}: {
  mealplanPayload: MealPlanDay[];
  setMealplanPayload: React.Dispatch<SetStateAction<MealPlanDay[]>>;
}) {
  const updateMeal = (
    dayOfWeek: number,
    meal: MealType,
    recipe: RecipeSupBrief
  ) => {
    setMealplanPayload((prev) =>
      prev.map((day) => {
        if (day.day_of_week !== dayOfWeek) return day;

        const current = day.meals[meal];

        if (current?.id === recipe.id) {
          return {
            ...day,
            meals: {
              ...day.meals,
              [meal]: null,
            },
          };
        }

        return {
          ...day,
          meals: {
            ...day.meals,
            [meal]: recipe,
          },
        };
      })
    );
  };

  const validDays = useMemo(() => getMealplanValidDays(), []);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/0">
            <TableHead className="py-4">Day</TableHead>
            <TableHead className="px-4">Recipe</TableHead>
            <TableHead className="text-right">Meal</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mealplanPayload.flatMap((day) => {
            const disabled = !validDays.includes(day.day_of_week);

            return (
              <Fragment key={day.day_of_week}>
                <TableRow className="border-b-0 hover:bg-muted/0">
                  <TableCell
                    rowSpan={3}
                    className={cn("align-top py-8", disabled && "opacity-50")}
                  >
                    {NUMBER_TO_DAY[day.day_of_week]}
                  </TableCell>
                  <TableCell className="md:max-w-[200px] md:min-w-[200px] min-w-[140px] max-w-[140px] py-2 pt-8">
                    <RecipeCombobox
                      value={day.meals.breakfast}
                      onSelect={(selectedRecipe) => {
                        selectedRecipe &&
                          updateMeal(
                            day.day_of_week,
                            "breakfast",
                            selectedRecipe
                          );
                      }}
                      disabled={disabled}
                    />
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right py-2 pt-8 text-muted-foreground",
                      disabled && "opacity-50"
                    )}
                  >
                    Breakfast
                  </TableCell>
                </TableRow>

                <TableRow className="border-b-0 hover:bg-muted/0">
                  <TableCell className="md:max-w-[200px] md:min-w-[200px] min-w-[140px] max-w-[140px] py-2">
                    <RecipeCombobox
                      value={day.meals.lunch}
                      onSelect={(selectedRecipe) => {
                        selectedRecipe &&
                          updateMeal(day.day_of_week, "lunch", selectedRecipe);
                      }}
                      disabled={disabled}
                    />
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right py-2 text-muted-foreground",
                      disabled && "opacity-50"
                    )}
                  >
                    Lunch
                  </TableCell>
                </TableRow>

                <TableRow className="hover:bg-muted/0">
                  <TableCell className="md:max-w-[200px] md:min-w-[200px] min-w-[140px] max-w-[140px] py-2 pb-8">
                    <RecipeCombobox
                      value={day.meals.dinner}
                      onSelect={(selectedRecipe) => {
                        selectedRecipe &&
                          updateMeal(day.day_of_week, "dinner", selectedRecipe);
                      }}
                      disabled={disabled}
                    />
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right py-2 pb-8 text-muted-foreground",
                      disabled && "opacity-50"
                    )}
                  >
                    Dinner
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
