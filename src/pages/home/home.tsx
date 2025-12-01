import MainLayout from "@/layouts/mainLayout";
import { RecipeCommand } from "@/components/recipeCommand";
import CategorySection from "./categorySection/categorySection";

import UserAvatar from "@/components/userAvatar";
import AllCategory from "./allCategory";
import type { RecipeCategory } from "@/types";
import { useState } from "react";
import ActiveCategorySection from "./activeCategorySection";

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
          <div className="flex gap-4  justify-between items-center">
            <h1 className="font-serif text-2xl md:text-5xl">
              What will you like to cook today?
            </h1>

            <UserAvatar />
          </div>

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
