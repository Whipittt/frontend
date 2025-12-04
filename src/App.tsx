import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes, { AuthenticatedRoutes } from "./routes/protectedRoutes";
import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  AUTHENTICATED_ROUTES,
  OPEN_ROUTES,
} from "./routes/routes";

function App() {
  return (
    <Routes>
      <Route path="auth">
        <Route index element={<Navigate to="login" replace />} />
        {AUTH_ROUTES.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Route>

      <Route>
        {OPEN_ROUTES.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Route>

      <Route element={<AuthenticatedRoutes />}>
        {AUTHENTICATED_ROUTES.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Route>

      <Route path="admin" element={<AdminRoutes />}>
        {ADMIN_ROUTES.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
export default App;
