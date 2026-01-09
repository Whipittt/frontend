import PageHeaderWithAvatar from "@/components/pageHeader";
import MainLayout from "@/layouts/mainLayout";
import { useState } from "react";
import type { RecipeSupBrief } from "@/types";
import MealplanForm from "./mealplanForm";
import { Button } from "@/components/ui/button";
import { useCreateMealplanData } from "@/hooks/useMealplanData";
import { toast } from "sonner";
import { normalizeWeeklyMeals } from "@/utils/mealplan";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

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
  const [mealplanDays, setMealplanDays] = useState<MealPlanDay[]>(
    initialMealplanPayload
  );

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate } = useCreateMealplanData();

  const createMealplan = () => {
    const week_start_date = new Date().toISOString().slice(0, 10);

    mutate(normalizeWeeklyMeals({ week_start_date, days: mealplanDays }), {
      onSuccess: () => {
        toast.success("Mealplan created successfully.");
        navigate("/mealplan");
        setError(null);
      },
      onError: (err) => {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      },
    });
  };

  return (
    <MainLayout className="px-2 md:px-8 md:gap-12">
      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <PageHeaderWithAvatar text="Create a Meal Plan?" />

      <MealplanForm
        mealplanPayload={mealplanDays}
        setMealplanPayload={setMealplanDays}
      />

      <div className="flex justify-between">
        <Button size="sm" variant="outline" className="rounded-full">
          Preview
        </Button>
        <Button size="sm" className="rounded-full" onClick={createMealplan}>
          Create Meal Plan
        </Button>
      </div>
    </MainLayout>
  );
}
