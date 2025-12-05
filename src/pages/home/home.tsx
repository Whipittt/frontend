import MainLayout from "@/layouts/mainLayout";
import { RecipeCommand } from "@/components/recipeCommand";
import CategorySection from "./categorySection/categorySection";
import AllCategory from "./allCategory";
import type { RecipeCategory } from "@/types";
import { useState } from "react";
import ActiveCategorySection from "./activeCategorySection";
import PageHeader from "@/components/pageHeader";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<RecipeCategory | "all">(
    "all"
  );

  const handleCategoryChange = () => {
    if (activeCategory !== "all") {
    }
  };

  return (
    <>
      <MainLayout>
        <section className="flex flex-col gap-6 md:px-0 px-4">
          <PageHeader text="What will you like to cook today?" />
          <RecipeCommand />
        </section>

        <CategorySection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onCategoryChange={() => handleCategoryChange()}
        />

        {activeCategory === "all" ? (
          <AllCategory />
        ) : (
          <ActiveCategorySection category={activeCategory} />
        )}
      </MainLayout>
    </>
  );
}
