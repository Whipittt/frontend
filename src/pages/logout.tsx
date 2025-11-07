import { useEffect } from "react";
import { useAuth } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      auth.logout();
      toast.success("You’ve been logged out successfully.");  
      navigate("/login");
    } catch (err: any) {
      console.log(`Error; ${err}`)
      toast.error("Something went wrong while logging you out.");
    }
  }, [auth, navigate]);

  return null;
}
