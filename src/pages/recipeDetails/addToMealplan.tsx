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
  const [daysOptions, setDaysoptions] = useState<string[]>();
  const [id, setId] = useState<string>();
  const [day, setDay] = useState<string>();
  const [mealType, setMealType] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const { data: latestMealplan } = useLatestMealplanData();

  const {
    mutateAsync,
    isPending,
    isError,
    error: mutateError,
  } = useUpdateOneMealplanMealData();

  useEffect(() => {
    if (latestMealplan?.id) {
      setId(latestMealplan.id);
      setDaysoptions(
        latestMealplan.days.map((day) => day.day_of_week.toString())
      );
    }
  }, [latestMealplan]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!id || !mealType || !day || !recipeID) return;

    try {
      const res = await mutateAsync({
        mealplanID: id,
        day,
        mealType,
        payload: { recipe_id: recipeID },
      });

      if (isError) {
        setError(mutateError.message);
      }

      if (res && !isPending && !isError) {
        toast.success("Meal plan updated sucessfully.");
        onOpenChange(false);
      }
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
            <FieldLabel htmlFor="confirm-password">Day</FieldLabel>
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger className="w-[180px] border-none outline-none bg-[#202020]">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {daysOptions?.map((dayValue) => (
                    <SelectItem value={dayValue}>
                      {NUMBER_TO_DAY[Number(dayValue)]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-password">Meal type</FieldLabel>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger className="w-[180px] border-none outline-none bg-[#202020]">
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
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
