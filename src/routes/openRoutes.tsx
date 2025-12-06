import SearchRecipes from "@/pages/searchRecipes";
import Home from "@/pages/home/home";
import RecipeDetails from "@/pages/recipeDetails/detail";
import CreateMealPaln from "@/pages/mealplan/mealplan";
import Forbidden from "@/pages/forbidden";
import NotFound from "@/pages/notFound";
import AddPreferences from "@/pages/addPreferences/addPreferences";
import type { AppRoute } from "@/types";

export const OPEN_ROUTES: AppRoute[] = [
  { path: "", element: <Home /> },

  {
    path: "recipes",
    children: [
      { path: ":recipe_id", element: <RecipeDetails /> },
      { path: "ingredients", element: <SearchRecipes /> },
    ],
  },

  {
    path: "preferences",
    children: [{ path: "add", element: <AddPreferences /> }],
  },

  { path: "mealplan", element: <CreateMealPaln /> },

  { path: "404", element: <NotFound /> },
  { path: "403", element: <Forbidden /> },
];
