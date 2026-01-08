import type {
  MealPlanDayMealsOut,
  MealPlanOut,
  MealplanPayload,
} from "@/types";

export function normalizeWeeklyMeals(payload: MealPlanOut): MealplanPayload {
  return {
    week_start_date: payload.week_start_date,
    days: payload.days
      .map((day) => {
        const meals: Partial<Record<keyof MealPlanDayMealsOut, string>> = {};

        if (day.meals.breakfast) meals.breakfast = day.meals.breakfast.id;

        if (day.meals.lunch) meals.lunch = day.meals.lunch.id;

        if (day.meals.dinner) meals.dinner = day.meals.dinner.id;

        if (Object.keys(meals).length === 0) {
          return null;
        }

        return {
          day_of_week: day.day_of_week,
          meals,
        };
      })
      .filter((day): day is MealplanPayload["days"][number] => day !== null),
  };
}
