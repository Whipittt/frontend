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
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: HomeIconFilled,
  },
  {
    title: "Favourites",
    url: "/favourites",
    icon: FavoriteIcon,
  },
  {
    title: "Meal Planner",
    url: "/mealplan",
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
    title: "Profile",
    url: "/profile",
    icon: AccountCircleOutlinedIcon,
  },
];

export function AppSidebar() {
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
                    <Link to={item.url}>
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
                          <div>
                            <item.icon className="!w-5 !h-5" />
                            <span className="text-sidebar-foreground">
                              {item.title}
                            </span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarSeparator orientation="horizontal" />
                    </Link>
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
