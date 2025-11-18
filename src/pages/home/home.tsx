import MainLayout from "@/layouts/mainLayout";
import { Helmet } from "react-helmet-async";
import { RecipeCommand } from "@/components/recipe-command";
import CategorySection from "./categorySection/categorySection";
import RecommendationSection from "./recommendationSection";
import DicsoverySection from "./dicsoverySection";
import WeeklySection from "./weeklySection";
import UserAvatar from "@/components/userAvatar";

const APP_NAME = import.meta.env.VITE_APP_NAME;

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{`${APP_NAME}`}</title>
      </Helmet>

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

        <CategorySection />

        <RecommendationSection />

        <DicsoverySection />

        <WeeklySection />
      </MainLayout>
    </>
  );
}
