import { cn } from "@/lib/utils";
import React from "react";
interface VerticalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function VerticalScroll({
  className,
  children,
}: VerticalScrollProps) {
  return (
    <div
      className={cn(
        "md:pl-0 pl-4 w-full flex gap-4 overflow-x-scroll snap-x snap-mandatory hide-scrollbar",
        className
      )}
    >
      {children}
    </div>
  );
}
