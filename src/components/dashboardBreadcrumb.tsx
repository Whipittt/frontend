import { useLocation, Link as RouterLink } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fragment } from "react/jsx-runtime";

export function DashboardBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const labelMap: Record<string, string> = {
    dashboard: "Dashboard",
    users: "Users",
    ingredients: "Ingredients",
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <RouterLink to="/">Home</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((segment, index) => {
          const isLast = index === pathnames.length - 1;
          const to = "/" + pathnames.slice(0, index + 1).join("/");

          const showEllipsis = pathnames.length > 3 && index === 0;

          return (
            <Fragment key={to}>
              <BreadcrumbSeparator />

              {showEllipsis ? (
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="size-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {pathnames.slice(0, pathnames.length - 2).map((p) => (
                        <DropdownMenuItem key={p}>
                          <RouterLink to={`/${p}`}>
                            {labelMap[p] ?? p}
                          </RouterLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>
                      {labelMap[segment] ?? segment}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <RouterLink to={to}>
                        {labelMap[segment] ?? segment}
                      </RouterLink>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
