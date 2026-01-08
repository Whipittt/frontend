import CreateMealplan from "@/pages/mealplan/createMealplan";
import Favourites from "@/pages/favourites/favourites";
import Mealplan from "@/pages/mealplan/mealplan";
import MyDashboard from "@/pages/mydashboard/myDashboard";
import Profile from "@/pages/profile/profile";
import type { AppRoute } from "@/types";
import EditMealplan from "@/pages/mealplan/editMealplan";

export const REQUIRE_AUTH_ROUTES: AppRoute[] = [
  { path: "profile", element: <Profile /> },
  { path: "favourites", element: <Favourites /> },
  { path: "my-dashboard", element: <MyDashboard /> },

  {
    path: "mealplan",
    children: [
      { index: true, element: <Mealplan /> },
      { path: "new", element: <CreateMealplan /> },
      { path: ":mealplan_id", element: <EditMealplan /> },
    ],
  },
];
