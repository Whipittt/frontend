import logo from "@/assets/images/secondary-logo.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LogoutIcon from "@mui/icons-material/Logout";
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
import { ChefHat, Package, Users } from "lucide-react";
import HomeIconFilled from "@mui/icons-material/HomeFilled";
import LogoutConfirmation from "./logoutConfirmation";
import { cn } from "@/lib/utils";

const BASE_URL = "/dashboard";

const menuItems = [
  { title: "Home", url: "/", icon: HomeIconFilled },
  { title: "Metrics", url: `${BASE_URL}`, icon: TrendingUpIcon },
  { title: "Users", url: `${BASE_URL}/users`, icon: Users },
  { title: "Ingredients", url: `${BASE_URL}/ingredients`, icon: Package },
  { title: "Recipes", url: `${BASE_URL}/recipes`, icon: ChefHat },
];

const menuFooterItems: any[] = [];

export function DashboardSidebar() {
  const { pathname } = useLocation();

  const isActive = (itemUrl: string) => {
    if (itemUrl === "/") return pathname === "/";
    if (itemUrl === BASE_URL) return pathname === BASE_URL;
    return pathname.startsWith(itemUrl);
  };

  const renderMenuItem = (item: (typeof menuItems)[number]) => {
    const active = isActive(item.url);

    return (
      <div key={item.title}>
        <SidebarMenuItem
          className={cn(
            "px-4 py-2 font-medium hover:bg-sidebar-accent",
            active ? "bg-sidebar-accent" : ""
          )}
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
          <Link to={"/"} className="flex items-center font-medium">
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
        <SidebarMenu>
          {menuFooterItems.map(renderMenuItem)}
          <SidebarSeparator orientation="horizontal" />
          <SidebarMenuItem className="px-4 py-2 font-medium hover:bg-sidebar-accent">
            <LogoutConfirmation>
              <SidebarMenuButton className="gap-4">
                <LogoutIcon className="!w-5 !h-5" />
                <span className="text-sidebar-foreground">Logout</span>
              </SidebarMenuButton>
            </LogoutConfirmation>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
