import { RecipeAPI } from "@/api/recipes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Ingredient, NewRecipe, Recipe } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeForm from "./recipeForm/recipeForm";
import DashboardLayout from "@/layouts/dashboardLayout";
import type { JSONContent } from "@tiptap/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/services/authService";
import { toast } from "sonner";

export default function UpdateRecipe() {
  const { recipe_id } = useParams();

  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const [id, setId] = useState("");
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
  const [time_minutes, setTimeMinutes] = useState(0);
  const [rating, setRating] = useState(0);
  const [display_image, setDisplayImage] = useState("");

  const { authFetch } = useAuth();

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        if (!recipe_id) {
          setError("No recipe ID provided.");
          setFetching(false);
          return;
        }

        setFetching(true);
        setError(null);

        const res = await RecipeAPI.fetchByID(recipe_id);

        setFetching(false);
        setRecipe(res);
      } catch (e: unknown) {
        setRecipe(null);
        setError(
          e instanceof Error
            ? e.message
            : `Failed to load recipe with the ID ${recipe_id}.`
        );
      } finally {
        setFetching(false);
      }
    };

    fetchIngredient();
  }, [recipe_id]);

  useEffect(() => {
    if (recipe) {
      setFetching(true);
      setId(recipe.id);
      setTitle(recipe.title);
      setDescription(recipe.description ?? "");
      setInstructions(recipe.instructions ?? "");
      setCuisines(recipe.cuisines ?? []);
      setTypes(recipe.types ?? []);
      setRating(recipe.rating ?? 0);
      setTimeMinutes(recipe.time_minutes ?? 0);
      setDisplayImage(recipe.display_image ?? "");
      setCategoryIds(
        recipe.categories ? recipe.categories.map((i) => i.id) : []
      );
      setSelectedIngredients(recipe.ingredients ?? []);
      setFetching(false);
    }
  }, [recipe]);

  // useEffect(() => {
  //   setSubmitBtnDisabled(
  //     loading ||
  //       !title.trim() ||
  //       title === recipe?.title ||
  //       !description.trim() ||
  //       description === recipe?.description ||
  //       !instructions.trim() ||
  //       instructions === recipe?.instructions ||
  //       isEmpty(category_ids) ||
  //       category_ids === recipe?.categories?.map((cat) => cat.id) ||
  //       isEmpty(ingredient_ids) ||
  //       ingredient_ids === recipe?.ingredients?.map((ing) => ing.id) ||
  //       isEmpty(cuisines) ||
  //       cuisines === recipe?.cuisines ||
  //       isEmpty(types) ||
  //       types === recipe?.types ||
  //       !rating ||
  //       rating === recipe?.rating ||
  //       !time_minutes ||
  //       time_minutes === recipe?.time_minutes ||
  //       !display_image.trim() ||
  //       display_image === recipe?.display_image
  //   );
  // }, [
  //   loading,
  //   recipe,
  //   title,
  //   description,
  //   instructions,
  //   category_ids,
  //   ingredient_ids,
  //   cuisines,
  //   types,
  //   rating,
  //   time_minutes,
  //   display_image,
  // ]);

  const updateRecipe = async (payload: NewRecipe) => {
    if (!recipe_id) {
      setError("No recipe ID provided in the URL.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedRecipe: Recipe = await RecipeAPI.admin.update(
        authFetch,
        recipe_id,
        payload
      );

      if (updatedRecipe) {
        setLoading(false);
        setRecipe(updatedRecipe);
        toast.success("Recipe updated succesfully");
      }
    } catch (e: unknown) {
      setError(
        e instanceof Error
          ? e.message
          : `Failed to update recipe with ID ${recipe_id}.`
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
            <h1 className="text-lg mb-4 font-medium">Update Recipe</h1>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <RecipeForm
              id={{
                value: id,
                setValue: setId,
              }}
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
              loading={fetching}
              submitBtn={{
                label: "Save changes",
                fn: (data) => updateRecipe(data),
                isLoading: loading,
                loadingText: "Saving changes...",
                disabled: false,
              }}
            />
          </CardContent>
        </Card>
      </DashboardLayout>
    </>
  );
}
