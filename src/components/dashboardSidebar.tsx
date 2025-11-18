import logo from "@/assets/images/secondary-logo.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
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
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Metrics",
    url: "/dashboard",
    icon: TrendingUpIcon,
  },
  {
    title: "Users",
    url: "/users",
    icon: PeopleAltRoundedIcon,
  },
  {
    title: "Meal Planner",
    url: "#",
    icon: CalendarTodayRoundedIcon,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: DashboardRoundedIcon,
  },
];

const menuFooterItems = [
  {
    title: "Logout",
    url: "#",
    icon: LogoutIcon,
  },
];

export function DashboardSidebar() {
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
              {menuItems.map((item) => {
                const active = useLocation().pathname === item.url;
                return (
                  <>
                    <SidebarMenuItem
                      key={item.title}
                      className={`px-4 py-2 font-medium hover:bg-sidebar-accent ${
                        active ? "bg-sidebar-accent" : ""
                      }`}
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        className="gap-4"
                      >
                        <Link to={item.url}>
                          <item.icon className="!w-5 !h-5" />
                          <span className="text-sidebar-foreground">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarSeparator orientation="horizontal" />
                  </>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-0">
        <SidebarMenu>
          {menuFooterItems.map((item) => {
            const active = useLocation().pathname === item.url;
            return (
              <>
                <SidebarSeparator orientation="horizontal" />
                <SidebarMenuItem
                  key={item.title}
                  className={`px-4 py-2 font-medium hover:bg-sidebar-accent ${
                    active ? "bg-sidebar-accent" : ""
                  }`}
                >
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    className="gap-4"
                  >
                    <Link to={item.url}>
                      <item.icon className="!w-5 !h-5" />
                      <span className="text-sidebar-foreground">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            );
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
