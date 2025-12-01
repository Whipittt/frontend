import { UserAPI } from "@/api/users";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useAuth } from "@/services/authService";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import type { User } from "@/types";
import { useAllUsersCache } from "../../../hooks/useUsers";

export default function AddNewUser() {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { authFetch } = useAuth();
  const { refetch: refetchAllusers } = useAllUsersCache();

  const addnewUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const addUserResponse: User = await UserAPI.admin.addNewUser(authFetch, {
        fullname: fullname,
        email: email,
        is_active: isActive,
        is_superuser: isSuperuser,
        password: import.meta.env.VITE_DEFAULT_ADMIN_PASSWORD,
      });

      if (addUserResponse) {
        toast.success("New user created sucessfully with default password");
        refetchAllusers();
      }
    } catch (error) {
      setError(`${error instanceof Error ? error.message : error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Users Details">
      <Card className="w-full p-6 rounded-3xl ">
        <CardHeader className="px-0 text-md">Add new user</CardHeader>
        <form
          noValidate
          onSubmit={addnewUser}
          className={"flex flex-col gap-6"}
        >
          <FieldGroup>
            {error && (
              <Alert variant="destructive" role="alert" aria-live="assertive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Enter fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Field>
            <Field>
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

            <Field>
              <Button disabled={loading || !fullname || !email} type="submit">
                Update User's Details
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Card>
    </DashboardLayout>
  );
}
