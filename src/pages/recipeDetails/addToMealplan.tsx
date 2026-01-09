import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { useEffect, useState, type FormEventHandler } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  useCreateMealplanData,
  useLatestMealplanData,
  useUpdateOneMealplanMealData,
} from "@/hooks/useMealplanData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NUMBER_TO_DAY } from "../mealplan/mealplanForm";

type AddToMealplanProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  recipeID: string;
};

export function AddToMealplan({
  open,
  onOpenChange,
  recipeID,
}: AddToMealplanProps) {
  const [day, setDay] = useState<string>("");
  const [mealType, setMealType] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const { data: latestMealplan } = useLatestMealplanData();

  const { mutateAsync: updateLatestPlan, isPending: isUpdatePending } =
    useUpdateOneMealplanMealData();

  const { mutateAsync: createPlan, isPending: isCreatePending } =
    useCreateMealplanData();

  const isPending = isUpdatePending || isCreatePending;

  useEffect(() => {
    setError(null);

    if (!open) {
      setDay("");
      setMealType("");
    }
  }, [open]);

  useEffect(() => {
    if (error) setError(null);
  }, [day, mealType]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    if (!mealType || !day || !recipeID || isPending) return;

    try {
      if (latestMealplan?.id) {
        await updateLatestPlan({
          mealplanID: latestMealplan!.id,
          day,
          mealType,
          payload: { recipe_id: recipeID },
        });
        toast.success("Meal plan updated successfully.");
      } else {
        await createPlan({
          week_start_date: new Date().toISOString().slice(0, 10),
          days: [
            {
              day_of_week: Number(day),
              meals: { [mealType]: recipeID },
            },
          ],
        });
        toast.success("Meal plan created successfully.");
      }

      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Recipe to Meal plan</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <Field>
            <FieldLabel>Day</FieldLabel>
            <Select value={day} onValueChange={setDay} disabled={isPending}>
              <SelectTrigger className="w-[180px] border-none outline-none bg-[#202020]">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from({ length: 7 }).map((_, index) => {
                    const dayNumber = index + 1;
                    return (
                      <SelectItem
                        key={dayNumber}
                        value={String(dayNumber)}
                        disabled={isPending}
                      >
                        {NUMBER_TO_DAY[dayNumber]}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Meal type</FieldLabel>
            <Select
              value={mealType}
              onValueChange={setMealType}
              disabled={isPending}
            >
              <SelectTrigger className="w-[180px] border-none outline-none bg-[#202020]">
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Breakfast" disabled={isPending}>
                    Breakfast
                  </SelectItem>
                  <SelectItem value="Lunch" disabled={isPending}>
                    Lunch
                  </SelectItem>
                  <SelectItem value="Dinner" disabled={isPending}>
                    Dinner
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending || !day || !mealType}>
              {isPending ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
