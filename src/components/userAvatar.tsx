import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/services/authService";
import { Link } from "react-router-dom";

export default function UserAvatar() {
  const { user } = useAuth();

  const initials = user?.fullname
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return (
    <Link to={"/profile"}>
      <Avatar>
        <AvatarImage src={user?.avatar} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
