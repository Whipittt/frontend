import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { NUMBER_TO_DAY } from "./mealplanForm";
import { Link } from "react-router-dom";

const MEAL_ORDER = ["breakfast", "lunch", "dinner"] as const;

const mealplan = [
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
  {
    day_of_week: 1,
    meals: {
      breakfast: {
        id: "38c7e053-55e7-4cb3-8c32-1e043f7149f8",
        title: "Nigerian Egg Stew",
      },
      lunch: {
        id: "1bdff0fa-136c-4e5a-bfec-78e73b88fc5b",
        title: "Nigerian Beef Tomato Stew",
      },
      dinner: {
        id: "f22c428f-b7d0-4f4b-8760-cde087072ba0",
        title: "Goat Meat Pepper Soup",
      },
    },
  },
  {
    day_of_week: 2,
    meals: {
      breakfast: {
        id: "4dc71f78-7b5d-4940-909b-417c325994fa",
        title: "Moi Moi",
      },
      lunch: {
        id: "e6ae93e8-fe7d-43d2-ae45-469e23794a5d",
        title: "Palm Oil Rice (Native Jollof)",
      },
      dinner: {
        id: "67999667-060d-4b61-a57d-d84d3bec26a",
        title: "Ofada Stew (Ayamase)",
      },
    },
  },
  {
    day_of_week: 3,
    meals: {
      breakfast: {
        id: "0337e853-3fac-4ddb-8092-958977486df6",
        title: "Tomato Spinach Sauce",
      },
      lunch: {
        id: "65a969fc-fa8c-451d-a87f-879f33ff40f",
        title: "Ewa Riro (Stewed Beans)",
      },
      dinner: {
        id: "43b834c7-535b-47ca-a060-58bd88cc27",
        title: "Ata Dindin (Pepper Fried Stew) with Assorted Meat",
      },
    },
  },
  {
    day_of_week: 4,
    meals: {
      breakfast: {
        id: "a8f7992b-6777-4a0c-acfe-bcd716dbdbf3",
        title: "Mackerel in Tomato Pepper Sauce",
      },
      lunch: {
        id: "70552f0d-96da-4ba9-9d30-4f7789943713",
        title: "Simple Beef Pepper Stir (Peppered Beef)",
      },
      dinner: {
        id: "fcb85d22-6027-40ac-9ae0-69733083428",
        title: "Efo Riro (Spinach Stew)",
      },
    },
  },
  {
    day_of_week: 5,
    meals: {
      breakfast: {
        id: "8b1e22aa-f405-4047-9c99-ef8d46b12505",
        title: "Mackerel Pepper Soup",
      },
      lunch: {
        id: "b5b702af-229d-46db-8cca-97e50566db17",
        title: "Ponmo Pepper Stew",
      },
      dinner: {
        id: "ae4db75d-d9a2-41fb-bef5-c226cb1fb237",
        title: "Peppered Goat Meat",
      },
    },
  },
  {
    day_of_week: 6,
    meals: {
      breakfast: {
        id: "dc9ea96b-c02f-4a39-840e-f57c9d33aad5",
        title: "Suya",
      },
      lunch: {
        id: "caec126f-3768-4cf7-83fb-80633a75c641",
        title: "Smoked Fish Pepper Stew",
      },
      dinner: {
        id: "ca34bde5-1276-46db-868e-1f2e07534cf0",
        title: "Jollof Rice",
      },
    },
  },
];

export function MealplanTable({ meals = mealplan }) {
  const safeMeals = Array.isArray(meals) ? meals : [];

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-t">
          <TableHead className="pl-8 py-4">Day</TableHead>
          <TableHead>Recipe</TableHead>
          <TableHead className="text-right pr-[40px]">Meal</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {safeMeals.flatMap((day, dayIndex) => {
          const dayName = NUMBER_TO_DAY[day?.day_of_week] ?? "—";
          const dayMealsObj = day?.meals ?? {};

          // Turn the meals object into an array in a predictable order:
          // breakfast -> lunch -> dinner (only if they exist)
          const dayMeals = MEAL_ORDER.flatMap((type) => {
            const meal = dayMealsObj[type];
            if (!meal) return [];
            return [{ ...meal, type }];
          });

          if (dayMeals.length === 0) return [];

          return dayMeals.map((meal, mealIndex) => {
            const isFirst = mealIndex === 0;
            const isLast = mealIndex === dayMeals.length - 1;

            return (
              <TableRow
                key={`${day?.day_of_week ?? `day-${dayIndex}`}-${
                  meal?.id ?? mealIndex
                }`}
                className={cn(
                  "hover:bg-muted/0 transition-colors",
                  !isLast && "border-b-0"
                )}
              >
                {isFirst && (
                  <TableCell
                    rowSpan={dayMeals.length}
                    className="align-top pl-8 py-8 font-medium"
                  >
                    {dayName}
                  </TableCell>
                )}

                <TableCell
                  className={cn(
                    "py-2 md:max-w-[200px] max-w-[160px] whitespace-nowrap overflow-hidden text-ellipsis",
                    isFirst && "pt-8",
                    isLast && "pb-8"
                  )}
                >
                  <Link to={`/recipes/${meal.id}`}>{meal.title}</Link>
                </TableCell>

                <TableCell
                  className={cn(
                    "py-2 pr-8 text-right",
                    isFirst && "pt-8",
                    isLast && "pb-8"
                  )}
                >
                  <div className="flex justify-end">
                    <Badge
                      variant="secondary"
                      className="text-xs py-2 font-normal capitalize md:min-w-[74px] flex items-center justify-center w-fit"
                    >
                      {meal?.type ?? "meal"}
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            );
          });
        })}
      </TableBody>
    </Table>
  );
}
