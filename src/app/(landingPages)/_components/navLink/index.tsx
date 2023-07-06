import Link from "next/link";
import { INavLinkProps } from "./interface";
import classes from "./style.module.css";

export const NavLink = (props: INavLinkProps) => {
  return (
    <li className={classes.navLink}>
      <Link
        className="block px-3 py-4 nav-link md:h-[100px] text-xl md:text-base md:flex cursor-pointer items-center justify-center text-textPrimary"
        href={props.path}
      >
        {props.name}
      </Link>
      <div className="h-[1px] bg-[#ccc] mx-3 md:hidden"></div>
    </li>
  );
};

export default NavLink;
