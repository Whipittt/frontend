import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useEffect, useState, type FormEventHandler } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAddUserData } from "@/hooks/useUsersData";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { DEFAULT_ADMIN_PASSWORD } from "@/constants";

type NewIngredientProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export function NewUserDialog({ open, onOpenChange }: NewIngredientProps) {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isActive, setIsActive] = useState(true);
  const [isSuperuser, setIsSuperuser] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    mutate: addNewUser,
    isPending,
    isError,
    error: addNewUserErr,
  } = useAddUserData();

  useEffect(() => {
    if (open) {
      setError(null);
      setFullname("");
      setEmail("");
      setIsActive(true);
      setIsSuperuser(false);
      setLoading(false);
    }
  }, [open]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);

      addNewUser({
        fullname: fullname,
        email: email,
        is_active: isActive,
        is_superuser: isSuperuser,
        password: DEFAULT_ADMIN_PASSWORD,
      });

      if (isError) {
        setError(addNewUserErr.message);
      }

      if (!isPending && !isError) {
        toast.success("New user created sucessfully with default password");
        onOpenChange(false);
      }
    } catch (error) {
      setError(
        `${error instanceof Error ? error.message : "Failed to create user."}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Enter the new user's details below to create a new user with default
            password.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <FieldGroup className="grid gap-4">
            <Field className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Field>
            <Field className="grid gap-3">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field className="grid grid-cols-2 gap-4">
              <Field>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={isSuperuser}
                    onCheckedChange={(value) => setIsSuperuser(!!value)}
                  />
                  <FieldLabel htmlFor="is_superuser">Is Superuser</FieldLabel>
                </div>
              </Field>
              <Field>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={isActive}
                    onCheckedChange={(value) => setIsActive(!!value)}
                  />
                  <FieldLabel htmlFor="is_superuser">Is Active</FieldLabel>
                </div>
              </Field>
            </Field>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={loading || isPending || !fullname || !email}
              >
                {isPending ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" /> Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
