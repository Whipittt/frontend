import { ingredientsAPI } from "@/api/ingredients";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteIngredientsData } from "@/hooks/useIngredientsData";
import { useAuth } from "@/services/authService";
import type { Ingredient, RecipeBrief } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DeleteIngredientConfirmationProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  ingredientID: string;
};

export default function DeleteIngredient({
  open,
  onOpenChange,
  ingredientID,
}: DeleteIngredientConfirmationProps) {
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [ingredientsRecipes, setIngredientsRecipes] = useState<
    RecipeBrief[] | null
  >(null);

  const [fetching, setFetching] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const { authFetch } = useAuth();

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        if (!ingredientID) {
          setError("No Ingredient ID provided.");
          setFetching(false);
          return;
        }

        setFetching(true);
        setError(null);

        const res: Ingredient = await ingredientsAPI.admin.fetchWithRecipes(
          authFetch,
          ingredientID
        );

        if (!res) {
          setIngredient(null);
          setError("Ingredient not found.");
        } else {
          setFetching(false);
          setIngredient(res);
          setIngredientsRecipes(res.recipes ?? null);
        }
      } catch (e: unknown) {
        setIngredient(null);
        setError(
          e instanceof Error
            ? e.message
            : `Failed to load ingredient with the ID ${ingredientID}.`
        );
      } finally {
        setFetching(false);
      }
    };

    fetchIngredient();
  }, [authFetch, ingredientID]);

  const {
    mutate: deleteIngredient,
    isPending,
    isError,
    error: deleteIngredientError,
  } = deleteIngredientsData();

  const handleDelete = async () => {
    deleteIngredient(ingredientID);

    if (isError) {
      setError(deleteIngredientError.message);
    }

    if (!isPending && !isError) {
      toast.success("Ingredient deleted sucessfully.");
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this ingredient?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col gap-3 text-left truncate">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription className="text-wrap">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              <div className="flex flex-col gap-1 truncate">
                <span className="font-medium mb-1">Details: </span>
                <p>ID: {fetching ? "..." : ingredient?.id}</p>
                <p>Name: {fetching ? "..." : ingredient?.name}</p>
              </div>
              {ingredientsRecipes && ingredientsRecipes?.length > 0 && (
                <>
                  <div className="flex flex-col gap-1 truncate">
                    <span className="font-medium mb-1">
                      The following recipes depend on it:
                    </span>
                    <ol className="list-disc list-inside">
                      {ingredientsRecipes.map((recipe) => (
                        <li key={recipe.id}>{recipe.title}</li>
                      ))}
                    </ol>
                  </div>
                  <span className="text-wrap">
                    Note: This ingredient would be remove from the list of
                    ingredients of each of these recipes.
                  </span>
                </>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={fetching || isPending}
            onClick={() => handleDelete()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
