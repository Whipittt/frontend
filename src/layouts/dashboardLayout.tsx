import React from "react";
import RootLayout from "./rootLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { DashboardSidebar } from "@/components/dashboardSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  pageTitle: string;
}

export default function DashboardLayout({
  className,
  children,
  pageTitle,
}: MainLayoutProps) {
  return (
    <SidebarProvider>
      <RootLayout pageTitle={pageTitle}>
        <div className="flex h-screen">
          <aside className="flex-shrink-0">
            <DashboardSidebar />
          </aside>

          <main
            className={cn(
              "flex flex-col flex-1 gap-8 px-2 md:px-8 py-4 md:py-8 overflow-auto scrollbar",
              className
            )}
          >
            {children}
          </main>
        </div>
      </RootLayout>
    </SidebarProvider>
  );
}
