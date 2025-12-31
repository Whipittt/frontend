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
import { Field } from "@/components/ui/field";
import { useEffect, useState, type FormEventHandler } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { addIngredientsData } from "@/hooks/useIngredientsData";
import { toast } from "sonner";

export function NewIngredientDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const {
    mutateAsync: addIngredient,
    isPending,
    isError,
    error: addIngredientError,
  } = addIngredientsData();

  useEffect(() => {
    if (open) {
      setError(null);
      setName("");
    }
  }, [open]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await addIngredient({ name });

      if (isError) {
        setError(addIngredientError.message);
      }

      if (res && !isPending && !isError) {
        toast.success("New Ingredient added sucessfully");
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
          <DialogTitle>Add Ingredient</DialogTitle>
          <DialogDescription>
            Enter the new ingredient name below and click save.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <Field className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Fresh pepper"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending || !name.trim()}>
              {isPending ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Adding ingredient...
                </>
              ) : (
                "Add ingredient"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
