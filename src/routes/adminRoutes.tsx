import Ingredients from "@/pages/admin/ingredients/ingredients";
import DashboardMetrics from "@/pages/admin/metrics/metrics";
import NewUser from "@/pages/admin/user/newUser";
import UserDetails from "@/pages/admin/user/userDetails";
import Users from "@/pages/admin/user/users";
import type { AppRoute } from "@/types";

export const REQUIRE_ADMIN_AUTH_ROUTES: AppRoute[] = [
  {
    path: "dashboard",
    children: [
      { index: true, element: <DashboardMetrics /> },

      {
        path: "users",
        children: [
          { index: true, element: <Users /> },
          { path: "new", element: <NewUser /> },
          { path: ":user_id", element: <UserDetails /> },
        ],
      },

      {
        path: "ingredients",
        children: [
          { index: true, element: <Ingredients /> },
          { path: "new", element: <NewUser /> },
          { path: ":ingredient_id", element: <UserDetails /> },
        ],
      },
    ],
  },
];
