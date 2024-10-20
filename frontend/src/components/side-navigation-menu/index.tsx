"use client";
import { AppRoutes } from "@/enum";
import { useAuth } from "@/hooks";
import { ChatOutlineIcon, LogoutOutlineIcon, UserOutlineIcon } from "@/icons";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { NavigationBackdrop, NavigationHeader, NavigationSidebar } from "./components";
import NavigationLink, { INavigationItem } from "./navigationLink";
import classes from "./style.module.css";

const SideNavigationMenu = () => {
  const currentPathname = usePathname();
  const auth = useAuth();

  const { navigationItems, actionButtons } = useMemo(() => {
    const navigationItems: INavigationItem[] = [
      {
        name: "Ask about Health",
        type: "link",
        icon: <ChatOutlineIcon />,
        redirectTo: AppRoutes.ASK,
        isActive: currentPathname === AppRoutes.ASK,
      },
      {
        name: "Profile",
        type: "link",
        icon: <UserOutlineIcon />,
        redirectTo: AppRoutes.PROFILE,
        isActive: currentPathname === AppRoutes.PROFILE,
      },
    ];

    const actionButtons: INavigationItem[] = [
      {
        name: "Sign Out",
        type: "action",
        icon: <LogoutOutlineIcon />,
        action: auth.logout,
      },
    ];
    return { navigationItems, actionButtons };
  }, [currentPathname]);

  return (
    <NavigationBackdrop>
      <NavigationSidebar>
        <NavigationHeader />
        <div className="flex-1 overflow-hidden">
          <div className={cn("h-full overflow-y-auto space-y-2 p-4 px-3", classes.navigationMenu)}>
            {auth.isAuthenticated &&
              navigationItems.map((item, index) => {
                return (
                  <NavigationLink
                    key={index}
                    {...item}
                  />
                );
              })}
            <div className="border-t"></div>
            {auth.isAuthenticated &&
              actionButtons.map((item, index) => {
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
