import React from "react";
import VerticalScroll from "@/components/verticalScroll";

type HomeSectionLayoutProps = {
  header: string;
  children: React.ReactNode;
};

export default function HomeSectionLayout({
  header,
  children,
}: HomeSectionLayoutProps) {
  return (
    <section className="flex flex-col gap-6 mt-4">
      <h2 className="px-4 md:px-0 font-semibold text-base">{header}</h2>
      <VerticalScroll>{children}</VerticalScroll>
    </section>
  );
}
