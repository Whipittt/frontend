import { UserAPI } from "@/api/users";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useAuth } from "@/services/authService";
import type { User } from "@/types";
import { useEffect, useState } from "react";
import { useParams, type Params } from "react-router-dom";
import { toast } from "sonner";

export default function UserDetails() {
  const { user_id } = useParams<Params>();
  const { authFetch } = useAuth();

  const [user, setUser] = useState<User | null>(null);

  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isActive, setIsActive] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [UpdateDetailsError, setUpdateDetailsError] = useState<string | null>(
    null
  );
  const [updatePasswordError, setUpdatePasswordError] = useState<string | null>(
    null
  );

  const isPasswordMatchError =
    confirmPassword.length > 0 && confirmPassword !== password;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user_id) {
          setError("No User ID provided in the URL.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        const user: User = await UserAPI.admin.fetchUserByID(
          authFetch,
          user_id
        );

        if (!user) {
          setUser(null);
          setError("User not found.");
        } else {
          setLoading(false);
          setUser(user);
          setFullname(user.fullname);
          setEmail(user.email);
          setIsSuperuser(user.is_superuser);
          setIsActive(user.is_active);
        }
      } catch (e: unknown) {
        setUser(null);
        setError(
          e instanceof Error
            ? e.message
            : `Failed to load User with the ID ${user_id}.`
        );
      }
    };

    fetchUser();
  }, [authFetch, user_id]);

  const updateUserData: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (!user_id) {
        setError("No User ID provided in the URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const user: User = await UserAPI.admin.updateUserDetails(
        authFetch,
        user_id,
        {
          fullname: fullname,
          email: email,
          is_active: isActive,
          is_superuser: isSuperuser,
        }
      );

      if (!user) {
        setUser(null);
        setUpdateDetailsError("User not found.");
      } else {
        setLoading(false);
        setUser(user);
        setFullname(user.fullname);
        setEmail(user.email);
        toast.success("User details updated succesfully");
      }
    } catch (e: unknown) {
      setUser(null);
      setUpdateDetailsError(
        e instanceof Error
          ? e.message
          : `Failed to update User with the ID ${user_id}.`
      );
    }
  };

  const resetUserpassword: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      if (!user_id) {
        setError("No User ID provided in the URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      await UserAPI.admin.resetUserPassword(authFetch, user_id, {
        new_password: password,
      });

      toast.success("Password reset was succesful");
      setPassword("");
      setConfirmPassword("");
    } catch (e: unknown) {
      setUser(null);
      setUpdatePasswordError(
        e instanceof Error ? e.message : `Failed to reset user password.`
      );
    }
  };

  return (
    <>
      <DashboardLayout pageTitle="Users Details">
        {error && (
          <Alert variant="destructive" role="alert" aria-live="assertive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!error && !loading && (
          <Card className="w-full p-4">
            <CardHeader>
              <form
                noValidate
                onSubmit={updateUserData}
                className={"flex flex-col gap-6"}
              >
                <FieldGroup>
                  <FieldTitle className="text-md">User Details</FieldTitle>

                  {UpdateDetailsError && (
                    <Alert
                      variant="destructive"
                      role="alert"
                      aria-live="assertive"
                    >
                      <AlertDescription>{UpdateDetailsError}</AlertDescription>
                    </Alert>
                  )}
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
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          checked={isSuperuser}
                          onCheckedChange={(value) => setIsSuperuser(!!value)}
                        />
                        <FieldLabel htmlFor="is_superuser">
                          Is Superuser
                        </FieldLabel>
                      </div>
                    </Field>
                    <Field>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          checked={isActive}
                          onCheckedChange={(value) => setIsActive(!!value)}
                        />
                        <FieldLabel htmlFor="is_superuser">
                          Is Active
                        </FieldLabel>
                      </div>
                    </Field>
                  </Field>

                  <Field>
                    <Button
                      disabled={
                        loading ||
                        (fullname == user?.fullname &&
                          email == user?.email &&
                          user.is_active == isActive &&
                          user.is_superuser == isSuperuser)
                      }
                      type="submit"
                    >
                      Update User's Details
                    </Button>
                  </Field>
                </FieldGroup>
              </form>

              <FieldTitle className="text-md pt-4">
                Reset User's password
              </FieldTitle>

              <form
                noValidate
                onSubmit={resetUserpassword}
                className={"flex flex-col gap-6"}
              >
                <FieldGroup>
                  <div className="flex flex-col gap-1"></div>
                  {updatePasswordError && (
                    <Alert
                      variant="destructive"
                      role="alert"
                      aria-live="assertive"
                    >
                      <AlertDescription>{updatePasswordError}</AlertDescription>
                    </Alert>
                  )}
                  <Field>
                    <Field className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="confirm-password">
                          Confirm Password
                        </FieldLabel>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Field>
                    </Field>
                    {isPasswordMatchError && (
                      <p className="text-destructive text-sm mt-1">
                        Passwords do not match
                      </p>
                    )}
                    <FieldDescription>
                      Must be at least 8 characters long and include at least
                      one letter and one number.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Button
                      disabled={loading || !password || !confirmPassword}
                      type="submit"
                    >
                      Reset Password
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardHeader>
          </Card>
        )}
      </DashboardLayout>
    </>
  );
}
