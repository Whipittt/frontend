import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const defaultWeeklyMeals = [
  {
    day: "Sunday",
    meals: [
      { type: "breakfast", id: "1", title: "Bread and Tea" },
      { type: "lunch", id: "2", title: "Rice and Tomato Stew" },
      { type: "dinner", id: "3", title: "Garri and Egusi Soup" },
    ],
  },
  {
    day: "Monday",
    meals: [
      { type: "breakfast", id: "1", title: "Bread and Tea" },
      { type: "lunch", id: "2", title: "Rice and Tomato Stew" },
      { type: "dinner", id: "3", title: "Garri and Egusi Soup" },
    ],
  },
  {
    day: "Tuesday",
    meals: [
      { type: "breakfast", id: "1", title: "Bread and Tea" },
      { type: "lunch", id: "2", title: "Rice and Tomato Stew" },
      { type: "dinner", id: "3", title: "Garri and Egusi Soup" },
    ],
  },
  {
    day: "Wednesday",
    meals: [
      { type: "breakfast", id: "1", title: "Bread and Tea" },
      { type: "lunch", id: "2", title: "Rice and Tomato Stew" },
      { type: "dinner", id: "3", title: "Garri and Egusi Soup" },
    ],
  },
  {
    day: "Thursday",
    meals: [
      { type: "breakfast", id: "1", title: "Bread and Tea" },
      { type: "lunch", id: "2", title: "Rice and Tomato Stew" },
      { type: "dinner", id: "3", title: "Garri and Egusi Soup" },
    ],
  },
  {
    day: "Friday",
    meals: [
      { type: "breakfast", id: "1", title: "Bread and Tea" },
      { type: "lunch", id: "2", title: "Rice and Tomato Stew" },
      { type: "dinner", id: "3", title: "Garri and Egusi Soup" },
    ],
  },
  {
    day: "Saturday",
    meals: [
      { type: "breakfast", id: "1", title: "Bread and Tea" },
      { type: "lunch", id: "2", title: "Rice and Tomato Stew" },
      { type: "dinner", id: "3", title: "Garri and Egusi Soup" },
    ],
  },
];

export function MealplanTable({ meals = defaultWeeklyMeals }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-8 text-sm">Day</TableHead>
          <TableHead className="text-sm">Recipe</TableHead>
          <TableHead className="pr-8 text-right text-sm">Meal Type</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {meals.map((day) => (
          <TableRow key={day.day}>
            {/* Day */}
            <TableCell className="pl-8 align-top py-6 font-medium text-base">
              {day.day}
            </TableCell>

            {/* Recipe */}
            <TableCell className="align-top py-6 text-base">
              <ul className="space-y-4">
                {day.meals.map((meal) => {
                  const key = `${day.day}-${meal.type}`;
                  return <li key={key}>{meal.title}</li>;
                })}
              </ul>
            </TableCell>

            {/* Meal type */}
            <TableCell className="align-top py-6  pr-8 text-right">
              <div className="flex flex-col items-end gap-4">
                {day.meals.map((meal) => {
                  const key = `${day.day}-${meal.type}`;
                  return (
                    <Badge
                      key={key}
                      className="capitalize rounded-full bg-primary/10 text-primary font-normal border border-primary hover:bg-primary/20 text-sm"
                    >
                      {meal.type}
                    </Badge>
                  );
                })}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
