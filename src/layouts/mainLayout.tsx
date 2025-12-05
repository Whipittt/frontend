import React from "react";
import RootLayout from "./rootLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";
import { cn } from "@/lib/utils";
import MobileNavbar from "@/components/mobileNavbar";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  pageTitle?: string;
  hideMobileNavbar?: boolean;
}

export default function MainLayout({
  className,
  children,
  pageTitle,
  hideMobileNavbar = false,
}: MainLayoutProps) {
  return (
    <SidebarProvider>
      <RootLayout pageTitle={pageTitle}>
        <div className="flex h-screen">
          <aside className="flex-shrink-0">
            <AppSidebar />
          </aside>

          <main
            className={cn(
              "flex flex-col flex-1 gap-6 md:px-8 px-3 py-4 md:py-8 overflow-auto md:scrollbar hide-scrollbar",
              className
            )}
          >
            {!hideMobileNavbar && <MobileNavbar />}

            {children}
          </main>
        </div>
      </RootLayout>
    </SidebarProvider>
  );
}
