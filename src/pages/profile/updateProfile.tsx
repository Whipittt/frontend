import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { useEffect, useState, type FormEventHandler } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useUpdateProfileData } from "@/hooks/useUsersData";
import type { User } from "@/types";
import { Input } from "@/components/ui/input";

type UpdateIngredientDialogProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

export function UpdateProfile({
  open,
  onOpenChange,
  user,
}: UpdateIngredientDialogProps) {
  const [id, setId] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const {
    mutateAsync: updateUser,
    isPending,
    isError,
    error: userUpdateError,
  } = useUpdateProfileData();

  useEffect(() => {
    setId(user.id ?? "");
    setFullname(user.fullname ?? "");
    setEmail(user.email ?? "");
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser({
        fullname,
        email,
      });

      if (isError) {
        setError(userUpdateError.message);
      }

      if (res && !isPending && !isError) {
        toast.success("Profile updated sucessfully.");
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
          <DialogTitle>Edit Personal Information</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <Field>
            <FieldLabel htmlFor="uid">User ID</FieldLabel>
            <Input
              id="uid"
              type="text"
              placeholder="Loading..."
              value={id}
              disabled
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Loading..."
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="Loading..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
