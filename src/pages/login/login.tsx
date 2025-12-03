import { useNavigate } from "react-router-dom";
import { useAuth } from "@/services/authService";
import AuthPageLayout from "@/layouts/authLayout";
import { LoginForm } from "@/pages/login/loginForm";
import { toast } from "sonner";
import loginHeroImage from "@/assets/images/login-hero.webp";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) navigate("/");

  const handleLoginSubmit = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      throw new Error("Please fill in both your email and password.");
    }

    try {
      await login({ email, password });
      toast.success("Login sucessful");
      navigate("/");
    } catch (err: any) {
      throw new Error(err?.message || "Something went wrong. Please try again");
    }
  };

  return (
    <AuthPageLayout heroImage={loginHeroImage} pageTitle="Welcome Back!">
      <LoginForm
        onFormSubmit={({ email, password }) =>
          handleLoginSubmit(email, password)
        }
      />
    </AuthPageLayout>
  );
}
