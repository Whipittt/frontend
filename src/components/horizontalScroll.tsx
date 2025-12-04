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
        "w-full grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-4 hide-scrollbar md:px-0 px-4",
        className
      )}
    >
      {children}
    </div>
  );
}
