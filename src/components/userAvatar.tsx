import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/services/authService";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function UserAvatar() {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const initials = user?.fullname
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return (
    <>
      {loading && (
        <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
      )}
      {!loading && isAuthenticated && (
        <Link to={"/profile"} className={isAuthenticated ? "" : "hidden"}>
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Link>
      )}

      {!loading && !isAuthenticated && (
        <Button
          variant={"outline"}
          className="rounded-full"
          onClick={() => navigate("/auth/login")}
        >
          Sign in
        </Button>
      )}
    </>
  );
}
