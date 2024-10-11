import { AppRoutes } from "@/enum";
import { useMemo } from "react";
import { useRouteMatcher } from "./useRouteMatcher";

export const useCurrentPath = () => {
  const { matchRoute } = useRouteMatcher();

  const activeRoute = useMemo(() => {
    let activeRoute = "";
    for (const route of Object.values(AppRoutes)) {
      if (matchRoute(route)) {
        activeRoute = route;
        break;
      }
    }
    return activeRoute;
  }, [matchRoute]);

  return activeRoute as AppRoutes;
};
