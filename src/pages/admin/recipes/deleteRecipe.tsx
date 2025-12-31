import { RecipeAPI } from "@/api/recipes";
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
import { useAuth } from "@/services/authService";
import type { Recipe } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DeleteRecipeProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  recipeId: string;
};

export default function DeleteRecipe({
  open,
  onOpenChange,
  recipeId: recipe_id,
}: DeleteRecipeProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const [fetching, setFetching] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { authFetch } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!recipe_id) {
          setError("No Recipe ID provided.");
          setFetching(false);
          return;
        }

        setFetching(true);
        setError(null);

        const res: Recipe = await RecipeAPI.fetchByID(recipe_id);

        if (!res) {
          setRecipe(null);
          setError("Recipe not found.");
        } else {
          setFetching(false);
          setRecipe(res);
        }
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

    fetchRecipe();
  }, [authFetch, recipe_id]);

  const deleteRecipe = async () => {
    setError(null);

    try {
      setLoading(true);
      const res = await RecipeAPI.admin.delete(authFetch, recipe_id);
      if (res) {
        toast.success("Recipe deleted sucessfully.");
        onOpenChange(false);
      }
    } catch (err) {
      err = await err;
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this recipe?
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
                <p>ID: {fetching ? "Loading..." : recipe?.id}</p>
                <p>Title: {fetching ? "Loading..." : recipe?.title}</p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={fetching || loading}
            onClick={() => deleteRecipe()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
