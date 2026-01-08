import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import MainLayout from "@/layouts/mainLayout";
import EditButton from "../profile/editButton";
import { MealplanTable } from "./malplanTable";
import PageHeaderWithAvatar from "@/components/pageHeader";
import { useLatestMealplanData } from "@/hooks/useMealplanData";
import { MealplanTableSkeleton } from "./mealplanTableSkeleton";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Mealplan() {
  const { data: mealplan, isPending, isError, error } = useLatestMealplanData();

  const days = mealplan?.days ?? [];
  const isEmpty = !isPending && !isError && days.length === 0;

  const navigate = useNavigate();

  return (
    <MainLayout className="px-2 md:px-8 md:gap-12">
      <PageHeaderWithAvatar text="Your Weekly Meal Schedule" />

      <section>
        <Card className="md:rounded-3xl md:py-2">
          <CardHeader className="flex flex-row justify-between items-start px-4 md:px-8">
            <span className="font-medium">Meal Schedule</span>
            {!isPending && !isEmpty && (
              <EditButton
                className="!mt-0 rounded-full"
                onClick={() => navigate(`/mealplan/${mealplan?.id}`)}
              />
            )}
          </CardHeader>

          <CardDescription className="mt-4">
            {isPending && <MealplanTableSkeleton days={2} />}

            {isError && (
              <div className="px-4 md:px-8 py-6 text-sm text-destructive">
                Failed to load meal plan
                {error instanceof Error ? `: ${error.message}` : "."}
              </div>
            )}

            {!isPending && isEmpty && (
              <div className="px-4 md:px-8 py-6 text-sm flex flex-col gap-4 items-center text-muted-foreground">
                <span>
                  No meal plan yet. Create one to see your weekly schedule.
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  onClick={() => navigate("/mealplan/new")}
                >
                  Create meal plan
                </Button>
              </div>
            )}

            {!isPending && !isError && days.length > 0 && (
              <MealplanTable meals={days} />
            )}
          </CardDescription>
        </Card>
      </section>
    </MainLayout>
  );
}
