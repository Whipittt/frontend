import React from "react";
import VerticalScroll from "@/components/verticalScroll";
import HorizontalScroll from "@/components/horizontalScroll";

type HomeSectionLayoutProps = {
  header: string;
  description?: string;
  children: React.ReactNode;
  scrollBehaviour?: "vertical" | "horizontal";
};

export default function HomeSectionLayout({
  header,
  children,
  description,
  scrollBehaviour,
}: HomeSectionLayoutProps) {
  return (
    <section className="flex flex-col gap-6 mt-4">
      <div className="flex flex-col gap-1 line-clamp-2">
        <h2 className="px-4 md:px-0 font-semibold text-base capitalize">
          {header}
        </h2>
        {description && (
          <span className="px-4 md:px-0 capitalize text-sm max-w-[70%]">
            {description}
          </span>
        )}
      </div>
      
      {scrollBehaviour === "horizontal" ? (
        <HorizontalScroll>{children}</HorizontalScroll>
      ) : (
        <VerticalScroll>{children}</VerticalScroll>
      )}
    </section>
  );
}
