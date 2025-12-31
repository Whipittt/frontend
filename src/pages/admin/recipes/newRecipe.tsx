import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RecipeForm from "./recipeForm/recipeForm";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useState } from "react";
import type { JSONContent } from "@tiptap/react";
import type { Ingredient, NewRecipe } from "@/types";
import { useAddRecipeData } from "@/hooks/useRecipes";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionJSON, setDescriptionJSON] = useState<JSONContent>({});
  const [instructions, setInstructions] = useState("");
  const [instruction_json, setInstructionJSON] = useState<JSONContent>({});
  const [category_ids, setCategoryIds] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [ingredient_ids, setIngredientIds] = useState<string[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [time_minutes, setTimeMinutes] = useState(1);
  const [display_image, setDisplayImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    mutateAsync: addNewRecipeData,
    isError,
    error: addNewRecipeErr,
    isPending,
  } = useAddRecipeData();

  const addNewRecipe = async () => {
    setError(null);

    try {
      setLoading(true);
      const res = await addNewRecipeData({
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
      });

      if (isError) {
        setError(addNewRecipeErr.message);
      }

      if (!isPending && !isError && res) {
        toast.success("New recipe added sucessfully");
      }
    } catch (error) {
      setError(
        `${error instanceof Error ? error.message : "Failed to add recipe."}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardLayout pageTitle="Add recipe">
        <Card className="w-full md:p-4">
          <CardHeader>
            <h1 className="text-lg mb-4 font-medium">Add Recipe</h1>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <RecipeForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              instructions={instructions}
              setInstructions={setInstructions}
              category_ids={category_ids}
              setCategoryIds={setCategoryIds}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
              ingredient_ids={ingredient_ids}
              setIngredientIds={setIngredientIds}
              cuisines={cuisines}
              setCuisines={setCuisines}
              types={types}
              setTypes={setTypes}
              time_minutes={time_minutes}
              setTimeMinutes={setTimeMinutes}
              rating={rating}
              setRating={setRating}
              display_image={display_image}
              setDisplayImage={setDisplayImage}
              instruction_json={instruction_json}
              setInstructionsJSON={setInstructionJSON}
              description_json={descriptionJSON}
              setDescriptionJSON={setDescriptionJSON}
              loading={loading}
              submitBtn={{
                label: "Add Recipe",
                fn: addNewRecipe,
                isLoading: isPending,
                loadingText: "Adding recipe...",
              }}
            />
          </CardContent>
        </Card>
      </DashboardLayout>
    </>
  );
}
