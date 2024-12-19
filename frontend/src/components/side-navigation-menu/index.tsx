"use client";
import { AppRoutes } from "@/enum";
import { useAuth } from "@/hooks";
import { ListOutlineIcon, SearchOutlineIcon } from "@/icons";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { NavigationBackdrop, NavigationHeader, NavigationSidebar } from "./components";
import Library from "./library";
import NavigationLink, { INavigationItem } from "./navigationLink";
import NewThread from "./new-thread";
import classes from "./style.module.css";
import UserInfo from "./user-info";

const SideNavigationMenu = () => {
  const currentPathname = usePathname();
  const auth = useAuth();

  const { navigationItems } = useMemo(() => {
    const navigationItems: INavigationItem[] = [
      {
        name: "Ask about Health",
        type: "link",
        icon: <SearchOutlineIcon />,
        redirectTo: AppRoutes.SEARCH,
        isActive: currentPathname === AppRoutes.SEARCH,
      },
      // {
      //   name: "Profile",
      //   type: "link",
      //   icon: <UserOutlineIcon />,
      //   redirectTo: AppRoutes.PROFILE,
      //   isActive: currentPathname === AppRoutes.PROFILE,
      // },
      {
        name: "Library",
        type: "link",
        icon: <ListOutlineIcon />,
        redirectTo: AppRoutes.LIBRARY,
        isActive: currentPathname === AppRoutes.LIBRARY,
      },
    ];

    return { navigationItems };
  }, [currentPathname]);

  return (
    <NavigationBackdrop>
      <NavigationSidebar className="bg-slate-100">
        <NavigationHeader />
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col gap-1 p-4 px-3">
            <NewThread />
            <div className="flex-1 overflow-hidden">
              <div className={cn("h-full overflow-y-auto space-y-1", classes.navigationMenu)}>
                {auth.isAuthenticated &&
                  navigationItems.map((item, index) => {
                    return (
                      <NavigationLink
                        key={index}
                        {...item}
                      />
                    );
                  })}
                {auth.isAuthenticated && <Library />}
              </div>
            </div>
            <UserInfo />
          </div>
        </div>
      </NavigationSidebar>
    </NavigationBackdrop>
  );
};

export default SideNavigationMenu;
