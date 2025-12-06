import { Navigate, Route, Routes } from "react-router-dom";
import { OPEN_ROUTES } from "./openRoutes";
import { RequireAuth, RequireAdminAuth } from "./protectedRoutes";
import { REQUIRE_ADMIN_AUTH_ROUTES } from "./adminRoutes";
import { renderRoutes } from "@/utils/renderRoutes";
import { REQUIRE_AUTH_ROUTES } from "./authenticatedRoutes";
import { AUTH_ROUTES } from "./authRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="auth">{renderRoutes(AUTH_ROUTES)}</Route>

      <Route>{renderRoutes(OPEN_ROUTES)}</Route>

      <Route element={<RequireAuth />}>
        {renderRoutes(REQUIRE_AUTH_ROUTES)}
      </Route>

      <Route element={<RequireAdminAuth />}>
        {renderRoutes(REQUIRE_ADMIN_AUTH_ROUTES)}
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
