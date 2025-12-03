import React from "react";
import RootLayout from "./rootLayout";
import logo from "@/assets/images/primary-logo.png";
import { Link } from "react-router-dom";

interface AuthPageLayoutProps {
  children: React.ReactNode;
  heroImage: string;
  pageTitle?: string;
}

export default function AuthPageLayout({
  children,
  pageTitle,
  heroImage,
}: AuthPageLayoutProps) {
  return (
    <RootLayout pageTitle={pageTitle}>
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="bg-muted relative hidden lg:block">
          <img
            src={heroImage}
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
          <div className="absolute top-10 left-10 flex justify-center gap-2 md:justify-start">
            <Link to={"/"} className="flex items-center gap-2 font-medium">
              <img src={logo} alt="naijafoodie" />
            </Link>
          </div>
        </div>
        <div className="bg-background text-foreground flex flex-col gap-4 p-6 md:p-20">
          <div className="flex flex-1 w-full">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
