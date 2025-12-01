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
      className={cn("w-full grid grid-cols-6 gap-6 hide-scrollbar", className)}
    >
      {children}
    </div>
  );
}
