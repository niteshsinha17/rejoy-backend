import { ROUTES } from "@/enum";

export interface INavLinkProps {
  name: string;
  path: ROUTES;
  active: boolean;
}
