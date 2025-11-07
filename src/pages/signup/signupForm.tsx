import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface SignupFormProps extends React.ComponentProps<typeof Card> {
  onFormSubmit: (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export function SignupForm({ onFormSubmit }: SignupFormProps) {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPasswordMatchError =
    confirmPassword.length > 0 && confirmPassword !== password;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onFormSubmit({
        fullName,
        email,
        password,
        confirmPassword,
      });
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={"flex flex-col gap-6"}>
      <FieldGroup>
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-primary text-5xl font-normal">
            Create an account
          </h1>
        </div>
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
            placeholder="Nebo Ikechukwu"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="unclenebo@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
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
            Must be at least 8 characters long and include at least one letter
            and one number.
          </FieldDescription>
        </Field>
        <Field>
          <Button
            disabled={
              loading || !fullName || !email || !password || !confirmPassword
            }
            type="submit"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link to="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
