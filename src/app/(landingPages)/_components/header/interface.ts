import { ROUTES } from "@/enum";

export interface INavItem {
  name: string;
  path?: ROUTES;
  type: "link" | "dropdown";
  children?: INavDropdown[];
}

export interface INavDropdown {
  name: string;
  description: string;
  icon: string;
  path: ROUTES;
}
