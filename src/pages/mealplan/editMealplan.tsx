import PageHeaderWithAvatar from "@/components/pageHeader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  useMealplanByIdNoCache,
  useUpdateMealplanData,
} from "@/hooks/useMealplanData";
import MainLayout from "@/layouts/mainLayout";
import {
  initialMealplanPayload,
  mergeMealplanDays,
  normalizeWeeklyMeals,
} from "@/utils/mealplan";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import MealplanForm from "./mealplanForm";
import { formatDate } from "@/utils/date";
import { type MealPlanDay } from "@/types";

export default function EditMealplan() {
  const { mealplan_id } = useParams();

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [mealplanDays, setMealplanDays] = useState<MealPlanDay[]>(
    initialMealplanPayload
  );

  if (!mealplan_id) {
    navigate("/mealplan");
    toast.error("No mealplan ID provided.");
    return;
  }

  const {
    data: mealplan,
    error: planError,
    isPending,
  } = useMealplanByIdNoCache(mealplan_id);

  if (planError) {
    navigate("/mealplan");
    planError instanceof Error && console.log(planError.message);
    toast.error(`Failed to load mealplan with the ID ${mealplan_id}.`);
  }

  useEffect(() => {
    if (mealplan) {
      setMealplanDays(mergeMealplanDays(initialMealplanPayload, mealplan.days));
    }
  }, [mealplan]);

  const { mutateAsync } = useUpdateMealplanData();

  async function updateMealplan() {
    if (!mealplan_id) return;

    try {
      const payload = normalizeWeeklyMeals({
        ...mealplan,
        days: mealplanDays,
      });

      await mutateAsync({
        mealplanID: mealplan_id,
        payload,
      });

      toast.success("Meal plan updated successfully");
      navigate("/mealplan");
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
            {error && (
              <Alert variant="destructive" role="alert" aria-live="assertive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Field>
              <FieldLabel htmlFor="uid">Plan ID</FieldLabel>
              <Input
                id="uid"
                type="text"
                value={isPending ? "Loading..." : mealplan?.id ?? ""}
                disabled
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="date">Week Start Date</FieldLabel>
              <Input
                id="date"
                type="text"
                value={
                  isPending
                    ? "Loading..."
                    : formatDate(new Date(mealplan?.week_start_date ?? ""))
                }
                disabled
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="uid">Weekly Meals</FieldLabel>
              <MealplanForm
                mealplanPayload={mealplanDays}
                setMealplanPayload={setMealplanDays}
              />
            </Field>

            <Field>
              <Button
                size="sm"
                className="rounded-full"
                disabled={isPending}
                onClick={updateMealplan}
              >
                Save Changes
              </Button>
            </Field>
          </FieldGroup>
        </CardHeader>
      </Card>
    </MainLayout>
  );
}
