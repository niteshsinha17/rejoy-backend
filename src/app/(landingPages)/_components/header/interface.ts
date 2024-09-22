import { Routes } from "@/enum";

export interface INavItem {
  name: string;
  path?: Routes;
  type: "link" | "dropdown";
  children?: INavDropdown[];
}

export interface INavDropdown {
  name: string;
  description: string;
  icon: string;
  path: Routes;
}
