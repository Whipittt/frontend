import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/services/authService";
import { toast } from "sonner";
import { SignupForm } from "@/pages/signup/signupForm";
import AuthPageLayout from "@/layouts/authLayout";
import signupHeroImage from "@/assets/images/signup-hero.webp";



const API_BASE = import.meta.env.VITE_BACKEND_BASE_URL;
const SIGNUP_ENDPOINT = import.meta.env.VITE_SIGNUP_ENDPOINT;

export default function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSignupSubmit = async (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      throw new Error("Please fill in all required fields.");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    try {
      const res = await fetch(`${API_BASE}${SIGNUP_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullname: fullName,
          email,
          password,
        }),
      });

      if (!res.ok) {
        let defMsg = "Sign up failed. Please try again.";
        try {
          const data = await res.json();
          if (data?.detail) {
            defMsg = Array.isArray(data.detail)
              ? data.detail
                  .map((d: any) => d.msg || d.detail || "")
                  .filter(Boolean)
                  .join(", ") || defMsg
              : data.detail || data.message || defMsg;
          } else if (data?.message) {
            defMsg = data.message;
          }
        } catch {
          // ignore parse errors
        }
        throw new Error(defMsg);
      }

      await login({ email, password });
      toast.success("Login sucessful");

      navigate(from, { replace: true });
    } catch (err: any) {
      throw new Error(err?.message || "Something went wrong.");
    }
  };

  return (
    <AuthPageLayout heroImage={signupHeroImage} pageTitle="Create your account">
      <SignupForm
        onFormSubmit={({ fullName, email, password, confirmPassword }) =>
          handleSignupSubmit(fullName, email, password, confirmPassword)
        }
      />
    </AuthPageLayout>
  );
}
