import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/services/authService";
import { toast } from "sonner";
import { SignupForm } from "@/pages/signup/signupForm";
import AuthPageLayout from "@/layouts/authLayout";
import signupHeroImage from "@/assets/images/signup-hero.webp";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/preferences/add";

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
      signup({
        fullname: fullName,
        email,
        password,
      });

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
