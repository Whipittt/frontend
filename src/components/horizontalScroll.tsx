import { cn } from "@/lib/utils";
import React from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalScroll({
  className,
  children,
}: HorizontalScrollProps) {
  return (
    <div
      className={cn(
        "w-full grid md:grid-cols-6 grid-cols-2 gap-8 hide-scrollbar md:px-0 px-4",
        className
      )}
    >
      {children}
    </div>
  );
}
