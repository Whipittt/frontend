import Favourites from "@/pages/favourites/favourites";
import Profile from "@/pages/profile/profile";
import type { AppRoute } from "@/types";

export const REQUIRE_AUTH_ROUTES: AppRoute[] = [
  { path: "profile", element: <Profile /> },
  { path: "favourites", element: <Favourites /> },
];
