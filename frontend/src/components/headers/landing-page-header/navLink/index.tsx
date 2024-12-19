import { cn } from "@/utils";
import Link from "next/link";
import { INavLinkProps } from "./interface";

export const NavLink = (props: INavLinkProps) => {
  return (
    <Link
      className={cn("block px-2 text-sm py-4 text-slate-500 font-medium cursor-pointer hover:text-slate-900", {
        "text-slate-900": props.active,
      })}
      href={props.path}
    >
      {props.name}
    </Link>
  );
};

export default NavLink;
