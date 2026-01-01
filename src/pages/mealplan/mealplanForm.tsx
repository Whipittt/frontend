import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecipeCombobox } from "./recipeCombobox";
import type { RecipeSupBrief } from "@/types";
import type { SetStateAction } from "react";

export const NUMBER_TO_DAY: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

export type MealType = "breakfast" | "lunch" | "dinner";

export type MealPlanDay = {
  day_of_week: number;
  meals: Record<MealType, RecipeSupBrief | null>;
};

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

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-4">Day</TableHead>
            <TableHead className="px-4">Recipe</TableHead>
            <TableHead className="text-right">Meal</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mealplanPayload.flatMap((day) => {
            return (
              <>
                <TableRow className="border-b-0 hover:bg-muted/0">
                  <TableCell rowSpan={3} className="align-top py-8">
                    {NUMBER_TO_DAY[day.day_of_week]}
                  </TableCell>
                  <TableCell className="md:max-w-[200px] md:min-w-[200px] min-w-[140px] max-w-[140px] py-2 pt-8">
                    <RecipeCombobox
                      value={day.meals.breakfast}
                      onSelect={(selectedRecipe) => {
                        updateMeal(
                          day.day_of_week,
                          "breakfast",
                          selectedRecipe
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right py-2 pt-8 text-muted-foreground">
                    Breakfast
                  </TableCell>
                </TableRow>

                <TableRow className="border-b-0 hover:bg-muted/0">
                  <TableCell className="md:max-w-[200px] md:min-w-[200px] min-w-[140px] max-w-[140px] py-2">
                    <RecipeCombobox
                      value={day.meals.lunch}
                      onSelect={(selectedRecipe) => {
                        updateMeal(day.day_of_week, "lunch", selectedRecipe);
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right py-2 text-muted-foreground">
                    Lunch
                  </TableCell>
                </TableRow>

                <TableRow className="hover:bg-muted/0">
                  <TableCell className="md:max-w-[200px] md:min-w-[200px] min-w-[140px] max-w-[140px] py-2 pb-8">
                    <RecipeCombobox
                      value={day.meals.dinner}
                      onSelect={(selectedRecipe) => {
                        updateMeal(day.day_of_week, "dinner", selectedRecipe);
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right py-2 pb-8 text-muted-foreground">
                    Dinner
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
