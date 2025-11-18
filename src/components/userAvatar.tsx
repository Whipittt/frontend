import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/services/authService";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function UserAvatar() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const initials = user?.fullname
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return (
    <>
      <Link to={"/profile"} className={isAuthenticated ? "" : "hidden"}>
        <Avatar>
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>

      <Button
        variant={"outline"}
        className={!isAuthenticated ? "rounded-full" : "hidden"}
        onClick={() => navigate("/login")}
      >
        Sign in
      </Button>
    </>
  );
}
