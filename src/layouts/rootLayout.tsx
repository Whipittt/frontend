import { cn } from "@/lib/utils";
import React from "react";
import { Helmet } from "react-helmet-async";

const APP_NAME = import.meta.env.VITE_APP_NAME;

type RootLayoutProps = {
  children: React.ReactNode;
  pageTitle?: string;
  className?: string;
};

export default function RootLayout({
  children,
  pageTitle,
  className,
}: RootLayoutProps) {
  return (
    <>
      <Helmet>
        <title>{`${pageTitle ? `${pageTitle} - ` : ""}${APP_NAME}`}</title>
      </Helmet>

      <main className={cn("w-full", className)}>{children}</main>
    </>
  );
}
