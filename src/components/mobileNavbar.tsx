import { Link } from "react-router-dom";
import logo from "@/assets/images/secondary-logo.png";
import { Menu } from "lucide-react";
import UserAvatar from "./userAvatar";
import { useSidebar } from "./ui/sidebar";

export default function MobileNavbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="flex justify-between md:hidden px-4 items-center">
      <div className="flex justify-center md:justify-start mt-1">
        <Link to="/" className="flex items-center font-medium">
          <img src={logo} alt="naijafoodie" className="h-8" />
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <UserAvatar />
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>
    </nav>
  );
}
