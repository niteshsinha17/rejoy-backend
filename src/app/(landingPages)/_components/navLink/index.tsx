import Link from "next/link";
import { INavLinkProps } from "./interface";
import classes from "./style.module.css";

export const NavLink = (props: INavLinkProps) => {
  return (
    <li className={classes.navLink}>
      <Link
        className="nav-link h-[100px] text-base flex cursor-pointer items-center justify-center text-textPrimary"
        href={props.path}
      >
        {props.name}
      </Link>
    </li>
  );
};

export default NavLink;
