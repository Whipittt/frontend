import React from "react";
import RootLayout from "./rootLayout";
import logo from "@/assets/images/primary-logo.png";
import loginHeroImage from "@/assets/images/login-hero.webp";
import signupHeroImage from "@/assets/images/signup-hero.webp";
import { Link } from "react-router-dom";

interface AuthPageLayoutProps {
  children: React.ReactNode;
  mode: "login" | "signup";
}

export default function AuthPageLayout({
  children,
  mode,
}: AuthPageLayoutProps) {
  return (
    <>
      <RootLayout
        pageTitle={mode === "login" ? "Welcome Back!" : "Create your account"}
      >
        <div className="grid min-h-svh lg:grid-cols-2">
          <div className="bg-muted relative hidden lg:block">
            <img
              src={mode == "login" ? loginHeroImage : signupHeroImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <div className="absolute top-10 left-10 flex justify-center gap-2 md:justify-start">
              <Link to={"/"} className="flex items-center gap-2 font-medium">
                <img src={logo} alt="naijafoodie" />
              </Link>
            </div>
          </div>
          <div className="bg-background text-foreground flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-md">{children}</div>
            </div>
          </div>
        </div>
      </RootLayout>
    </>
  );
}
