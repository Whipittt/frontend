import logo from "@/assets/images/secondary-logo.png";
import HomeIconFilled from "@mui/icons-material/HomeFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/services/authService";
import { UserRoundCog } from "lucide-react";

export function AppSidebar() {
  const { pathname } = useLocation();

  const { loading, isSuperuser } = useAuth();

  const menuItems = [
    { title: "Home", url: "/", icon: HomeIconFilled },
    { title: "Favourites", url: "/favourites", icon: FavoriteIcon },
    { title: "Meal Planner", url: "/mealplan", icon: CalendarTodayRoundedIcon },
    { title: "Dashboard", url: "/my-dashboard", icon: DashboardRoundedIcon },
    ...(!loading && isSuperuser
      ? [
          {
            title: "Admin Dashboard",
            url: "/dashboard",
            icon: UserRoundCog,
          },
        ]
      : []),
  ];

  const menuFooterItems = [
    { title: "Profile", url: "/profile", icon: AccountCircleOutlinedIcon },
  ];

  const renderMenuItem = (item: (typeof menuItems)[number]) => {
    const active = pathname === item.url;

    return (
      <div key={item.title}>
        <SidebarMenuItem
          className={`px-4 py-2 font-medium hover:bg-sidebar-accent ${
            active ? "bg-sidebar-accent" : ""
          }`}
        >
          <SidebarMenuButton asChild isActive={active} className="gap-4">
            <Link to={item.url} className="flex items-center gap-4">
              <item.icon className="!w-5 !h-5" />
              <span className="text-sidebar-foreground">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarSeparator orientation="horizontal" />
      </div>
    );
  };

  return (
    <Sidebar className="!border-none">
      <SidebarHeader>
        <div className="flex justify-center md:justify-start py-12 px-6">
          <Link to="/" className="flex items-center font-medium">
            <img src={logo} alt="naijafoodie" className="h-8" />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarSeparator orientation="horizontal" />
              {menuItems.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-0">
        <SidebarSeparator orientation="horizontal" />
        <SidebarMenu>{menuFooterItems.map(renderMenuItem)}</SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
