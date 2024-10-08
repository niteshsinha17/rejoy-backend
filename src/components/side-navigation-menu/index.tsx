"use client";
import { AppRoutes } from "@/enum";
import { useAuth } from "@/hooks";
import { DashboardOutlineIcon } from "@/icons";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { NavigationBackdrop, NavigationHeader, NavigationSidebar } from "./components";
import NavigationLink, { INavigationItem } from "./navigationLink";

const SideNavigationMenu = () => {
  const currentPathname = usePathname();
  const auth = useAuth();

  const navigationItems = useMemo(() => {
    console.log("currentPathname", currentPathname);
    const items: INavigationItem[] = [
      {
        name: "Dashboard",
        type: "link",
        icon: <DashboardOutlineIcon className="icon-sm text-slate-500" />,
        redirectTo: AppRoutes.DASHBOARD,
        isActive: currentPathname === AppRoutes.DASHBOARD,
      },
    ];

    return items;
  }, [currentPathname]);

  return (
    <NavigationBackdrop>
      <NavigationSidebar>
        <NavigationHeader />
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto space-y-2 p-4 px-3">
            {auth.isAuthenticated &&
              navigationItems.map((item, index) => {
                return (
                  <NavigationLink
                    key={index}
                    {...item}
                  />
                );
              })}
          </div>
        </div>
      </NavigationSidebar>
    </NavigationBackdrop>
  );
};

export default SideNavigationMenu;
