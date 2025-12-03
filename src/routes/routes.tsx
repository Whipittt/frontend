import Login from "@/pages/login/login";
import SignUp from "@/pages/signup/signup";
import type { ReactNode } from "react";
import AddNewUser from "@/pages/admin/user/newUser";
import UserDetails from "@/pages/admin/user/userDetails";
import Users from "@/pages/admin/user/users";
import Favourites from "@/pages/favourites/favourites";
import Profile from "@/pages/profile/profile";
import SearchResults from "@/pages/searchResults";
import Home from "@/pages/home/home";
import RecipeDetails from "@/pages/recipeDetails/detail";
import CreateMealPaln from "@/pages/mealplan/mealplan";
import Forbidden from "@/pages/forbidden";
import NotFound from "@/pages/notFound";
import AddPreferences from "@/pages/addPreferences/addPreferences";
import DashboardMetrics from "@/pages/admin/metrics/metrics";
import Ingredients from "@/pages/admin/ingredients/ingredients";

export type AppRoute = {
  path: string;
  element: ReactNode;
};

export const AUTH_ROUTES: AppRoute[] = [
  { path: "login", element: <Login /> },
  { path: "signup", element: <SignUp /> },
];

export const OPEN_ROUTES: AppRoute[] = [
  { path: "", element: <Home /> },
  { path: "preferences/add", element: <AddPreferences /> },
  { path: "recipe/:recipe_id", element: <RecipeDetails /> },
  { path: "recipes/ingredients", element: <SearchResults /> },
  { path: "mealplan", element: <CreateMealPaln /> },
  { path: "404", element: <NotFound /> },
  { path: "403", element: <Forbidden /> },
];

export const AUTHENTICATED_ROUTES: AppRoute[] = [
  { path: "profile", element: <Profile /> },
  { path: "favourites", element: <Favourites /> },
];

export const ADMIN_ROUTES: AppRoute[] = [
  { path: "dashboard", element: <DashboardMetrics /> },
  { path: "users", element: <Users /> },
  { path: "users/new", element: <AddNewUser /> },
  { path: "users/:user_id", element: <UserDetails /> },
  { path: "ingredients", element: <Ingredients /> },
];
