import { Routes } from "@/enum";

export interface INavLinkProps {
  name: string;
  path: Routes;
  active: boolean;
  onClick: () => void;
}
