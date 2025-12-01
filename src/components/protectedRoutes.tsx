import { useAuth } from "@/services/authService";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function AdminRoutes() {
  const { isAuthenticated, isSuperuser, loading } = useAuth();
  const location = useLocation();

  if (!loading && !isAuthenticated) {
    toast.warning("You have to be authenticated to access the requested page.")
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  if (!loading && !isSuperuser) {
    return <Navigate to={"/403"} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
