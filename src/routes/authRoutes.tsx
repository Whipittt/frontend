import Login from "@/pages/login/login";
import SignUp from "@/pages/signup/signup";
import type { AppRoute } from "@/types";

export const AUTH_ROUTES: AppRoute[] = [
  { index: true, element: <Login /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <SignUp /> },
];
