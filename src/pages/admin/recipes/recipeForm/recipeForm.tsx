import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Ingredient, NewRecipe } from "@/types";
import { useEffect, useState } from "react";
import ImagePreview from "./imagePreview";
import { CategoryCombobox } from "./categoryCombobox";
import { IngredientsCombobox } from "./ingredientsCombobox";
import { NewIngredientDialog } from "../../ingredients/newIngredient";
import { TypeCombobox } from "./typeCombobox";
import { CuzineCombobox } from "./cuizineCombobox";
import { NewRecipeCategoryDialog } from "./newRecipeCategory";
import RichTextEditor from "@/components/richTextEditor";
import type { JSONContent } from "@tiptap/react";
import { Stepper } from "@/components/stepper";
import { isEmpty } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

type RecipeFormProps = {
  id?: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  };
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  instructions: string;
  setInstructions: React.Dispatch<React.SetStateAction<string>>;
  category_ids: string[];
  setCategoryIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedIngredients: Ingredient[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  ingredient_ids: string[];
  setIngredientIds: React.Dispatch<React.SetStateAction<string[]>>;
  cuisines: string[];
  setCuisines: React.Dispatch<React.SetStateAction<string[]>>;
  types: string[];
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
  time_minutes: number;
  setTimeMinutes: React.Dispatch<React.SetStateAction<number>>;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  display_image: string;
  setDisplayImage: React.Dispatch<React.SetStateAction<string>>;
  instruction_json: JSONContent;
  setInstructionsJSON?: React.Dispatch<React.SetStateAction<JSONContent>>;
  description_json?: JSONContent;
  setDescriptionJSON?: React.Dispatch<React.SetStateAction<JSONContent>>;

  submitBtn: {
    label?: string;
    fn: (data: NewRecipe) => void;
    isLoading?: boolean;
    loadingText?: string;
    disabled?: boolean;
  };

  loading?: boolean;
};

export default function RefipeForm({
  id,
  title,
  setTitle,
  description,
  setDescription,
  instructions,
  setInstructions,
  category_ids,
  setCategoryIds,
  ingredient_ids,
  setIngredientIds,
  selectedIngredients,
  setSelectedIngredients,
  cuisines,
  setCuisines,
  types,
  setTypes,
  time_minutes,
  setTimeMinutes,
  rating,
  setRating,
  display_image,
  setDisplayImage,
  instruction_json,
  setInstructionsJSON,
  description_json,
  setDescriptionJSON,

  submitBtn,

  loading,
}: RecipeFormProps) {
  const [newCategoryOpen, setNewCategoryOpen] = useState<boolean>(false);
  const [newIngredientOpen, setNewIngredientOpen] = useState<boolean>(false);
  const [previewImageOpen, setPreviewImageOpen] = useState(false);

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  useEffect(
    () => setIngredientIds(selectedIngredients.map((i) => i.id ?? "")),
    [selectedIngredients]
  );

  useEffect(() => {
    setSubmitBtnDisabled(
      loading ||
        !title.trim() ||
        !description.trim() ||
        !instructions.trim() ||
        isEmpty(category_ids) ||
        isEmpty(ingredient_ids) ||
        isEmpty(cuisines) ||
        isEmpty(types) ||
        !rating ||
        !time_minutes ||
        !display_image.trim()
    );
  }, [
    loading,
    title,
    description,
    instructions,
    category_ids,
    ingredient_ids,
    cuisines,
    types,
    rating,
    time_minutes,
    display_image,
  ]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    let newRecipe: NewRecipe = {
      title,
      description,
      instructions,
      category_ids,
      ingredient_ids,
      cuisines,
      types,
      time_minutes,
      rating,
      display_image,
      instruction_json,
    };

    submitBtn.fn(newRecipe);
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={"flex flex-col gap-6"}
      >
        <FieldGroup>
          {id && (
            <Field>
              <FieldLabel htmlFor="recipe_id">Id</FieldLabel>
              <Input
                id="recipe_id"
                type="text"
                placeholder="Enter recipe id"
                value={loading ? "Loading..." : id.value}
                onChange={(e) => id.setValue(e.target.value)}
                disabled
              />
            </Field>
          )}

          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              type="text"
              placeholder="Enter recipe title"
              value={loading ? "Loading..." : title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <RichTextEditor
              value={description_json?.content ? description_json : description}
              placeholder={loading ? "Loading..." : "Enter recipe description"}
              setHTML={setDescription}
              setJSON={setDescriptionJSON}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="instruction">Instruction</FieldLabel>
            <RichTextEditor
              value={
                instruction_json?.content ? instruction_json : instructions
              }
              placeholder={loading ? "Loading..." : "Enter recipe instructions"}
              setHTML={setInstructions}
              setJSON={setInstructionsJSON}
            />
          </Field>

          <Field className="md:flex-row justify-between gap-6">
            <Field>
              <FieldLabel htmlFor="rating">Rating</FieldLabel>
              <Stepper
                value={loading ? 0 : rating}
                onChange={(val) => setRating(val)}
                min={0}
                max={5}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Cook Time In Muinutes</FieldLabel>
              <Stepper
                value={loading ? 0 : time_minutes}
                onChange={(val) => setTimeMinutes(val)}
                min={1}
                max={480}
              />
            </Field>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Categories</FieldLabel>
            <CategoryCombobox
              selected={category_ids}
              setSelected={setCategoryIds}
              loading={loading}
            />
            <Button
              variant="link"
              className="!w-fit px-0"
              type="button"
              onClick={() => setNewCategoryOpen((prev) => !prev)}
              disabled={loading}
            >
              Add new category
            </Button>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Ingredients</FieldLabel>
            <IngredientsCombobox
              selected={selectedIngredients}
              setSelected={setSelectedIngredients}
              loading={loading}
            />
            <Button
              variant="link"
              className="!w-fit px-0"
              type="button"
              onClick={() => setNewIngredientOpen((prev) => !prev)}
              disabled={loading}
            >
              Add new ingredient
            </Button>
          </Field>

          <Field className="md:flex-row justify-between gap-6">
            <Field>
              <FieldLabel htmlFor="email">Cuisine</FieldLabel>
              <CuzineCombobox
                loading={loading}
                selected={cuisines}
                setSelected={setCuisines}
              />
            </Field>

            <Field>
              <FieldLabel>Type</FieldLabel>
              <TypeCombobox
                loading={loading}
                selected={types}
                setSelected={setTypes}
              />
            </Field>
          </Field>

          <Field>
            <FieldLabel htmlFor="displayImage">Display Image Link</FieldLabel>
            <Input
              id="displayImage"
              type="url"
              placeholder="https://linktoyourimage.jpg"
              value={loading ? "Loading..." : display_image}
              onChange={(e) => setDisplayImage(e.target.value)}
            />
            <Button
              variant="link"
              className="!w-fit px-0"
              type="button"
              disabled={loading || !display_image.trim()}
              onClick={() => setPreviewImageOpen((prev) => !prev)}
            >
              Preview image
            </Button>
          </Field>

          <Field>
            <Button
              type="submit"
              disabled={submitBtn.disabled ?? submitBtnDisabled}
            >
              {submitBtn.isLoading ? (
                <>
                  <Spinner /> {submitBtn.loadingText ?? "Saving..."}
                </>
              ) : (
                submitBtn.label ?? "Submit"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <NewRecipeCategoryDialog
        open={newCategoryOpen}
        onOpenChange={setNewCategoryOpen}
      />

      <NewIngredientDialog
        open={newIngredientOpen}
        onOpenChange={setNewIngredientOpen}
      />

      <ImagePreview
        imageURL={display_image}
        open={previewImageOpen}
        onOpenChange={setPreviewImageOpen}
      />
    </>
  );
}
