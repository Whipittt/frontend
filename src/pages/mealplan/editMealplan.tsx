import PageHeaderWithAvatar from "@/components/pageHeader";
import MainLayout from "@/layouts/mainLayout";
import { useEffect, useState } from "react";
import type { MealPlanOut, RecipeSupBrief } from "@/types";
import MealplanForm from "./mealplanForm";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { mealplanAPI } from "@/api/mealplans";
import { useAuth } from "@/services/authService";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DatePicker } from "@/components/date-picker";
import { useUpdateMealplanData } from "@/hooks/useMealplanData";
import { toast } from "sonner";
import { normalizeWeeklyMeals } from "@/utils/mealplan";

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

function mergeMealplanDays(
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

export default function EditMealplan() {
  const { mealplan_id } = useParams();
  const { authFetch } = useAuth();

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [mealplan, setMealplan] = useState<MealPlanOut | null>(null);

  const [mealplanDays, setMealplanDays] = useState<MealPlanDay[]>(
    initialMealplanPayload
  );

  useEffect(() => {
    const fetchMealplan = async () => {
      try {
        if (!mealplan_id) {
          setError("No mealplan ID provided.");
          return;
        }

        setFetching(true);
        setError(null);

        const res: MealPlanOut = await mealplanAPI.fetchByID(
          authFetch,
          mealplan_id
        );

        setMealplan(res);

        setMealplanDays(mergeMealplanDays(initialMealplanPayload, res.days));
      } catch (e: unknown) {
        setMealplan(null);
        setError(
          e instanceof Error
            ? e.message
            : `Failed to load mealplan with the ID ${mealplan_id}.`
        );

        setMealplanDays(initialMealplanPayload);
      } finally {
        setFetching(false);
      }
    };

    fetchMealplan();
  }, [mealplan_id, authFetch]);

  const { mutateAsync } = useUpdateMealplanData();

  async function updateMealplan() {
    if (!mealplan_id || !mealplan) return;

    try {
      const payload = normalizeWeeklyMeals({
        ...mealplan,
        days: mealplanDays,
      });

      mutateAsync({
        mealplanID: mealplan_id,
        payload,
      });

      toast.success("Meal plan updated successfully");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to update mealplan.");
    }
  }

  return (
    <MainLayout className="px-2 md:px-8 md:gap-12">
      <PageHeaderWithAvatar text="Edit Meal Plan?" />

      <Card className="w-full md:p-4 p-2 px-1">
        <CardHeader>
          <FieldGroup>
            <FieldTitle className="text-md">Mealplan Details</FieldTitle>

            {error && (
              <Alert variant="destructive" role="alert" aria-live="assertive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Input
              id="uid"
              type="text"
              placeholder="Loading..."
              value={mealplan?.id ?? ""}
              disabled
            />

            <Field>
              <FieldLabel htmlFor="uid">Week Start Date</FieldLabel>
              <DatePicker passValue={mealplan?.week_start_date ?? ""} />
            </Field>

            <Field>
              <FieldLabel htmlFor="uid">Weekly Meals</FieldLabel>
              <MealplanForm
                mealplanPayload={mealplanDays}
                setMealplanPayload={setMealplanDays}
              />
            </Field>
          </FieldGroup>
        </CardHeader>
      </Card>

      <div className="flex justify-end">
        <Button
          size="sm"
          className="rounded-full"
          disabled={fetching}
          onClick={updateMealplan}
        >
          Save Changes
        </Button>
      </div>
    </MainLayout>
  );
}
