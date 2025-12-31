import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { useEffect, useState, type FormEventHandler } from "react";
import { useAuth } from "@/services/authService";
import { ingredientsAPI } from "@/api/ingredients";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import type { Ingredient } from "@/types";
import { toast } from "sonner";
import { updateIngredientsData } from "@/hooks/useIngredientsData";

type UpdateIngredientDialogProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  ingredientID: string;
};

export function UpdateIngredientDialog({
  open,
  onOpenChange,
  ingredientID,
}: UpdateIngredientDialogProps) {
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);

  const [name, setName] = useState("");

  const [fetching, setFetching] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const { authFetch } = useAuth();

  const {
    mutateAsync: updateIngredient,
    isPending,
    isError,
    error: updateIngredientError,
  } = updateIngredientsData();

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

        const res = await ingredientsAPI.admin.fetchByID(
          authFetch,
          ingredientID
        );

        if (!res) {
          setIngredient(null);
          setError("Ingredient not found.");
        } else {
          setFetching(false);
          setIngredient(res);
          setName(res.name);
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const res = await updateIngredient({
        ingredientID: ingredientID,
        payload: {
          name,
        },
      });

      if (isError) {
        setError(updateIngredientError.message);
      }

      if (res && !isPending && !isError) {
        toast.success("Ingredient updated sucessfully.");
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
          <DialogTitle>Update Ingredient</DialogTitle>
          <DialogDescription>
            Enter the new ingredient name below and click save changes.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <FieldGroup className="grid gap-4">
            <Field className="grid gap-3">
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                placeholder="Loading..."
                value={ingredient?.id}
                disabled
              />
            </Field>
            <Field className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Loading..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={fetching || isPending || !name.trim()}
            >
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
