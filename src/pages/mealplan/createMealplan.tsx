import PageHeaderWithAvatar from "@/components/pageHeader";
import MainLayout from "@/layouts/mainLayout";
import { useEffect, useMemo, useState } from "react";
import type { MealPlanDay } from "@/types";
import MealplanForm from "./mealplanForm";
import { Button } from "@/components/ui/button";
import {
  useCreateMealplanData,
  useLatestMealplanData,
} from "@/hooks/useMealplanData";
import { toast } from "sonner";
import {
  initialMealplanPayload,
  isPlanExpired,
  normalizeWeeklyMeals,
} from "@/utils/mealplan";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

export default function CreateMealplan() {
  const navigate = useNavigate();
  const { data, isPending, isError } = useLatestMealplanData();

  const isExpired = useMemo(() => {
    if (!data?.week_start_date) return false;
    return isPlanExpired(new Date(data.week_start_date));
  }, [data?.week_start_date]);

  useEffect(() => {
    if (!isPending && !isError && data && !isExpired) {
      toast.error("You already have an active meal plan.");

      const t = setTimeout(() => {
        navigate(-1);
      }, 500);

      return () => clearTimeout(t);
    }
  }, [isPending, isError, data, isExpired, navigate]);

  const [mealplanDays, setMealplanDays] = useState<MealPlanDay[]>(
    initialMealplanPayload
  );

  const [error, setError] = useState<string | null>(null);

  const { mutate } = useCreateMealplanData();

  const createMealplan = () => {
    mutate(normalizeWeeklyMeals({ days: mealplanDays }), {
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
