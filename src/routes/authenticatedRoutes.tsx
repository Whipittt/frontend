import Favourites from "@/pages/favourites/favourites";
import MyDashboard from "@/pages/mydashboard/myDashboard";
import Profile from "@/pages/profile/profile";
import type { AppRoute } from "@/types";

export const REQUIRE_AUTH_ROUTES: AppRoute[] = [
  { path: "profile", element: <Profile /> },
  { path: "favourites", element: <Favourites /> },
  { path: "my-dashboard", element: <MyDashboard /> },
];
