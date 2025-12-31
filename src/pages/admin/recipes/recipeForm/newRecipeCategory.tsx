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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { addRecipeCategoryData } from "@/hooks/useRecipeCategories";
import { toast } from "sonner";

type NewRecipeCategoryProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export function NewRecipeCategoryDialog({
  open,
  onOpenChange,
}: NewRecipeCategoryProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    mutate: addRecipeCategory,
    isError,
    error: addRecipeCategoryErr,
    isPending,
  } = addRecipeCategoryData();

  useEffect(() => {
    if (open) {
      setError(null);
      setName("");
      setDescription("");
      setLoading(false);
    }
  }, [open]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    setLoading(true);

    addRecipeCategory({ name, description });

    if (isError) setError(addRecipeCategoryErr.message);

    if (!isPending && !isError) {
      toast.success("Recipe category was added sucessfully.");
      onOpenChange(false);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Recipe Category</DialogTitle>
          <DialogDescription>
            Enter the new recipe category's name and description below and click
            save.
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Vegan"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Plant-based recipes with no animal products..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              disabled={
                loading || isPending || !name.trim() || !description.trim()
              }
            >
              {loading || isPending ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
