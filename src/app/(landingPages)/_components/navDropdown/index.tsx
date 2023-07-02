import Image from "next/image";
import Link from "next/link";
import { arrowDownIcon } from "../../../../../public/icons";
import { INavDropdownProps } from "./interface";
import classes from "./style.module.css";

const NavDropdown = (props: INavDropdownProps) => {
  return (
    <li
      className={`h-[100px] flex cursor-pointer items-center justify-center text-base text-textPrimary ${classes.dropdown}`}
    >
      {props.item.name}
      <Image
        className={`ml-2 w-2 ${classes.arrowIcon}`}
        src={arrowDownIcon}
        alt="arrow down"
      />
      <div
        className={`${classes.dropdownMenu} fixed bg-white w-[100%] left-[0px] top-[100px]`}
      >
        <div className="container mx-auto py-4 grid grid-cols-3 gap-4">
          {props.item.children?.map((subLink, index) => {
            return (
              <Link
                key={index}
                className="group cursor-pointer flex gap-2 p-2"
                href={subLink.path}
              >
                <div>
                  <Image
                    className="w-8 h-8"
                    src={subLink.icon}
                    alt={subLink.name}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-poppins text-base font-semibold text-textPrimary group-hover:underline">
                    {subLink.name}
                  </div>
                  <div className="font-poppins font-normal text-sm mt-2 text-textSecondary">
                    {subLink.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </li>
  );
};

export default NavDropdown;
