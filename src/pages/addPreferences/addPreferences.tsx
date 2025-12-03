import AuthPageLayout from "@/layouts/authLayout";
import preferenceHeroImage from "@/assets/images/preference-hero.webp";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RestrictionCombobox } from "@/components/combobox";

export function Option({
  label,
  selectedValue,
}: {
  label: string;
  selectedValue: string;
}) {
  const selected = selectedValue === label;

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full p-3 rounded-xl border transition-all duration-200 ease-in-out",
        selected
          ? "border-[#14D85C] bg-[#00422B] text-[#14D85C]"
          : "bg-[#383838]"
      )}
    >
      <RadioGroupItem
        value={label}
        id={label}
        className={cn(
          selected ? "border-[#14D85C] text-[#14D85C]" : "border-white"
        )}
      />
      <Label htmlFor={label}>{label}</Label>
    </div>
  );
}

export default function AddPreferences() {
  const [level, setLevel] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(
    []
  );
  const [ethnicity, setEthnicity] = useState("Igbo");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  console.log({
    level,
    cookTime,
    selectedRestrictions,
    ethnicity,
  });

  setLoading(false);
};

  return (
    <AuthPageLayout
      heroImage={preferenceHeroImage}
      pageTitle="Let’s know you better"
    >
      <form noValidate onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col gap-1 mb-4">
            <h1 className="font-serif text-primary text-5xl font-normal">
              Let’s know you better?
            </h1>
          </div>

          {error && (
            <Alert variant="destructive" role="alert" aria-live="assertive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Field className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="password">Skill Level</FieldLabel>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-[180px] border-none outline-none bg-[#202020]">
                  <SelectValue placeholder="Beginner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Cooking Time</FieldLabel>
              <Select value={cookTime} onValueChange={setCookTime}>
                <SelectTrigger className="w-[180px] border-none outline-none bg-[#202020]">
                  <SelectValue placeholder="Quick Meals" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="quick_meals">Quick Meals</SelectItem>
                    <SelectItem value="long_prep_meals">
                      Long-Prep Meals
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Dietary Restrictions</FieldLabel>
            <RestrictionCombobox
              selected={selectedRestrictions}
              setSelected={setSelectedRestrictions}
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
          <Field>
            <Button
              disabled={loading || selectedRestrictions.length<1 || !level || !cookTime}
              type="submit"
              className="py-5 mt-4 rounded-md"
            >
              {loading ? "Submiting..." : "Submit"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </AuthPageLayout>
  );
}
