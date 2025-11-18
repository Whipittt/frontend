import MainLayout from "@/layouts/mainLayout";
import { Helmet } from "react-helmet-async";
import FavouriteRecipeCard from "./favouriteRecipeCard";
import UserAvatar from "@/components/userAvatar";
import { useFavourites } from "@/hooks/useRecipes";
import type { RecipeBrief } from "@/types/types";

const APP_NAME = import.meta.env.VITE_APP_NAME;

export default function Favourites() {
  const { data, error } = useFavourites();

  if (error) {
    return (
      <MainLayout className="px-2 md:px-8 gap-12">
        <section>
          <div className="flex gap-4  justify-between items-center">
            <h1 className="font-serif text-2xl md:text-5xl">Your Favorites</h1>
            <UserAvatar />
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <p className="text-center">Failed to fetch recommendations</p>
        </section>
      </MainLayout>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <MainLayout className="px-2 md:px-8 gap-12">
        <section>
          <div className="flex gap-4  justify-between items-center">
            <h1 className="font-serif text-2xl md:text-5xl">Your Favorites</h1>
            <UserAvatar />
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <p className="text-center">You have no favorite recipes yet</p>
        </section>
      </MainLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`My Favourites - ${APP_NAME}`}</title>
      </Helmet>

      <MainLayout className="px-2 md:px-8 gap-12">
        <section>
          <div className="flex gap-4  justify-between items-center">
            <h1 className="font-serif text-2xl md:text-5xl">Your Favorites</h1>

            <UserAvatar />
          </div>
        </section>

        <section className="flex flex-col gap-8">
          {data?.map((recipe: RecipeBrief) => (
            <FavouriteRecipeCard data={recipe} />
          ))}
        </section>
      </MainLayout>
    </>
  );
}
