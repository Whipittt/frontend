import MainLayout from "@/layouts/mainLayout";
import { RecipeCommand } from "@/components/recipeCommand";
import CategorySection from "./categorySection/categorySection";
import AllCategory from "./allCategory";
import type { RecipeCategory } from "@/types";
import ActiveCategorySection from "./activeCategorySection";
import PageHeaderWithAvatar from "@/components/pageHeader";
import MobileNavbar from "@/components/mobileNavbar";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export default function Home() {
  const [activeCategory, setActiveCategory] = useSessionStorage<
    RecipeCategory | "all"
  >("activeCategory", "all");

  const handleCategoryChange = () => {
    if (activeCategory !== "all") {
    }
  };

  return (
    <>
      <MainLayout hideMobileNavbar className="px-0">
        <MobileNavbar className="px-3" />

        <div className="flex flex-col gap-6 md:px-0 px-3">
          <PageHeaderWithAvatar text="What will you like to cook today?" />
          <RecipeCommand />
        </div>

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
