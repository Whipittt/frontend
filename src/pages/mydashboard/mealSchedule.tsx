import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { MealplanTable } from "../mealplan/malplanTable";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function MealSchedule() {
  return (
    <Card className="rounded-3xl py-6">
      <CardHeader className="flex flex-row justify-between items-start px-8">
        <span className="font-medium">Meal Schedule</span>

        <Button className="rounded-full font-medium">
          View <ArrowRight />
        </Button>
      </CardHeader>

      <CardDescription className="mt-4">
        <MealplanTable
          meals={[
            {
              day_of_week: 7,
              meals: {
                breakfast: {
                  id: "d6ae8991-1da1-4ddd-85da-10297f2c9576",
                  title: "Akara",
                },
                lunch: {
                  id: "ca34bde5-1276-46db-868e-1f2e07534cf0",
                  title: "Jollof Rice",
                },
                dinner: {
                  id: "6f3470d5-35b7-4729-bb93-287148cfba38",
                  title: "Egusi Soup",
                },
              },
            },
          ]}
        />
      </CardDescription>
    </Card>
  );
}
