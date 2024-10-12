import { AppRoutes } from "@/enum";
import { baseMatchRoute, getFilledRoutes } from "@/utils";
import { usePathname } from "next/navigation";
import { usePathParams } from "./usePathParams";

/*
  This hook provides a function that tries to match the current route with the given route.
*/

interface IUseRouteMatcherConfig {
  pathname?: string;
  exact?: boolean;
}

export const useRouteMatcher = () => {
  const currentPathname = usePathname();
  const pathParams = usePathParams();

  const matchRoute = (route: AppRoutes, config?: IUseRouteMatcherConfig) => {
    const { pathname = currentPathname, exact = true } = config || {};
    const filledRoute = getFilledRoutes(route, pathParams);
    return baseMatchRoute(filledRoute, pathname, exact);
  };

  return { matchRoute, currentPathname };
};
