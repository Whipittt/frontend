import type {
  MealPlanDay,
  MealPlanDayMealsOut,
  MealPlanOut,
  MealplanPayload,
  RecipeSupBriefWithMealType,
} from "@/types";

export const NUMBER_TO_DAY: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

export const initialMealplanPayload: MealPlanDay[] = [
  { day_of_week: 7, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 1, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 2, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 3, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 4, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 5, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 6, meals: { breakfast: null, lunch: null, dinner: null } },
];

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

export function mergeMealplanDays(
  template: MealPlanDay[],
  actual: MealPlanDay[] | undefined | null
): MealPlanDay[] {
  const actualByDay = new Map<number, MealPlanDay>(
    (actual ?? []).map((d) => [d.day_of_week, d])
  );

  return template.map((t) => {
    const found = actualByDay.get(t.day_of_week);
    if (!found) return t;

    return {
      day_of_week: t.day_of_week,
      meals: {
        breakfast: found.meals.breakfast ?? null,
        lunch: found.meals.lunch ?? null,
        dinner: found.meals.dinner ?? null,
      },
    };
  });
}

export function isPlanExpired(start_date: Date) {
  const current_date = new Date();
  const end_date = new Date(start_date);
  end_date.setDate(start_date.getDate() + 7);

  if (current_date > end_date) {
    return true;
  }

  return false;
}

export function dayScheduleFromMeaplan(
  mealplan: MealPlanOut,
  day: number = new Date().getDay()
): MealPlanDay | null {
  const dayQ = day === 0 ? 7 : day;
  const daySchedule = mealplan.days.find((sch) => sch.day_of_week === dayQ);
  return daySchedule ? daySchedule : null;
}

export function upcomingMealTypeFromTime(date = new Date()) {
  const hours = date.getHours();

  if (hours < 6) {
    return "breakfast";
  }

  if (hours < 12) {
    return "lunch";
  }

  if (hours < 18) {
    return "dinner";
  }

  return "nextBreakfast";
}

const UPCOMING_MEAL_LABEL: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  nextBreakfast: "Breakfast",
};

export function upcomingMealFromTime(
  mealplan: MealPlanOut
): RecipeSupBriefWithMealType | null {
  const daySchedule = dayScheduleFromMeaplan(mealplan);
  if (daySchedule == null) {
    return null;
  }

  const upcomingMealType = upcomingMealTypeFromTime();
  if (upcomingMealType === "nextBreakfast") {
    const nextDay = new Date().getDay() + 1;
    const nextDaySchedule = dayScheduleFromMeaplan(mealplan, nextDay);
    if (nextDaySchedule == null) {
      return null;
    }
    const meal = nextDaySchedule.meals["breakfast"];
    if (meal == null) {
      return null;
    }
    return {
      ...meal,
      type: UPCOMING_MEAL_LABEL[upcomingMealType],
    };
  } else {
    const meal = daySchedule.meals[upcomingMealType];
    if (meal == null) {
      return null;
    }
    return {
      ...meal,
      type: UPCOMING_MEAL_LABEL[upcomingMealType],
    };
  }
}
