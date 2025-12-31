import Ingredients from "@/pages/admin/ingredients/ingredients";
import DashboardMetrics from "@/pages/admin/metrics/metrics";
import NewRecipe from "@/pages/admin/recipes/newRecipe";
import Recipes from "@/pages/admin/recipes/recipes";
import UpdateRecipe from "@/pages/admin/recipes/updateRecipe";
import UpdateUser from "@/pages/admin/users/updateUser";
import Users from "@/pages/admin/users/users";
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
          { path: ":user_id", element: <UpdateUser /> },
        ],
      },

      {
        path: "ingredients",
        children: [{ index: true, element: <Ingredients /> }],
      },

      {
        path: "recipes",
        children: [
          { index: true, element: <Recipes /> },
          { path: "new", element: <NewRecipe /> },
          { path: ":recipe_id/update", element: <UpdateRecipe /> },
        ],
      },
    ],
  },
];
