import PageHeaderWithAvatar from "@/components/pageHeader";
import MainLayout from "@/layouts/mainLayout";
import { useEffect, useState } from "react";
import type { RecipeSupBrief } from "@/types";
import MealplanForm from "./mealplanForm";
import { Button } from "@/components/ui/button";

type MealType = "breakfast" | "lunch" | "dinner";

type MealPlanDay = {
  day_of_week: number;
  meals: Record<MealType, RecipeSupBrief | null>;
};

const initialMealplanPayload: MealPlanDay[] = [
  { day_of_week: 7, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 1, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 2, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 3, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 4, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 5, meals: { breakfast: null, lunch: null, dinner: null } },
  { day_of_week: 6, meals: { breakfast: null, lunch: null, dinner: null } },
];

export default function CreateMealplan() {
  const [mealplanPayload, setMealplanPayload] = useState<MealPlanDay[]>(
    initialMealplanPayload
  );

  useEffect(() => console.log(mealplanPayload), [mealplanPayload]);

  return (
    <MainLayout className="px-2 md:px-8 md:gap-12">
      <PageHeaderWithAvatar text="Create a Meal Plan?" />

      <MealplanForm
        mealplanPayload={mealplanPayload}
        setMealplanPayload={setMealplanPayload}
      />

      <div className="flex justify-between">
        <Button size="sm" variant="outline" className="rounded-full">
          Preview
        </Button>
        <Button size="sm" className="rounded-full">
          Create Meal Plan
        </Button>
      </div>
    </MainLayout>
  );
}
