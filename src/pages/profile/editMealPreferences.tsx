import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Option } from "../addPreferences/addPreferences";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { useEffect, useState, type FormEventHandler } from "react";
import { useAuth } from "@/services/authService";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useUpdatePreferenceData } from "@/hooks/useUsersData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RestrictionCombobox } from "@/components/combobox";
import { RadioGroup } from "@/components/ui/radio-group";
import type { Preference } from "@/types";

type UpdateIngredientDialogProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  preference: Preference;
};

export function EditMealPreferences({
  open,
  onOpenChange,
  preference,
}: UpdateIngredientDialogProps) {
  const [skill_level, setSkillLevel] = useState("");
  const [cooking_time, setCookingTime] = useState("");
  const [dietary_restriction_ids, setDietaryRestrictionIds] = useState<
    string[]
  >([]);
  const [ethnicity, setEthnicity] = useState("Igbo");

  const [error, setError] = useState<string | null>(null);

  const { authFetch } = useAuth();

  const {
    mutateAsync: updatePreference,
    isPending,
    isError,
    error: updatePreferenceError,
  } = useUpdatePreferenceData();

  useEffect(() => {
    setSkillLevel(preference.skill_level ?? "");
    setCookingTime(preference.cooking_time ?? "");
    setEthnicity(preference.ethnicity ?? "");
    setDietaryRestrictionIds(
      preference?.dietary_restrictions?.map((dr) => dr.id) ?? []
    );
  }, [authFetch]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const res = await updatePreference({
        skill_level,
        cooking_time,
        ethnicity,
        dietary_restriction_ids,
      });

      if (isError) {
        setError(updatePreferenceError.message);
      }

      if (res && !isPending && !isError) {
        toast.success("Prefrences updated sucessfully.");
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
          <DialogTitle>Edit Meal Preferences</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <Field>
            <FieldLabel htmlFor="password">Skill Level</FieldLabel>
            <Select value={skill_level} onValueChange={setSkillLevel}>
              <SelectTrigger className="w-[180px] border-none outline-none bg-[#202020]">
                <SelectValue placeholder="Beginner" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-password">Cooking Time</FieldLabel>
            <Select value={cooking_time} onValueChange={setCookingTime}>
              <SelectTrigger className="w-[180px] border-none outline-none bg-[#202020]">
                <SelectValue placeholder="Quick Meals" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Quick meals">Quick Meals</SelectItem>
                  <SelectItem value="Long prep meals">
                    Long-Prep Meals
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Dietary Restrictions</FieldLabel>
            <RestrictionCombobox
              selected={dietary_restriction_ids}
              setSelected={setDietaryRestrictionIds}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Ethnicity</FieldLabel>
            <RadioGroup
              defaultValue="Igbo"
              value={ethnicity}
              onValueChange={setEthnicity}
              className="w-full flex gap-4 justify-between"
            >
              <Option label="Igbo" selectedValue={ethnicity} />
              <Option label="Hausa" selectedValue={ethnicity} />
              <Option label="Yoruba" selectedValue={ethnicity} />
            </RadioGroup>
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
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
