import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { arrowDownIcon } from "../../../../../public/icons";
import { INavDropdownProps } from "./interface";
import classes from "./style.module.css";

const NavDropdown = (props: INavDropdownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <li
      className={`md:h-[100px] px-3 py-4 text-xl font-semibold md:font-normal md:flex cursor-pointer items-center justify-between md:justify-center md:text-base text-textPrimary ${classes.dropdown}`}
    >
      {props.item.name}
      <Image
        className={`ml-2 w-2 ${classes.arrowIcon}`}
        src={arrowDownIcon}
        alt="arrow down"
      />
      <div
        className={`${classes.dropdownMenu} md:fixed bg-white w-[100%] md:left-[0px] md:top-[100px] ${classes.dropdownMenuOpen}`}
      >
        <div className="md:container md:mx-auto md:py-4 md:grid md:grid-cols-3 md:gap-4">
          {props.item.children?.map((subLink, index) => {
            return (
              <Link
                onClick={() => {
                  setOpen(false);
                  props.close();
                }}
                key={index}
                className="group cursor-pointer flex gap-2 p-2"
                href={subLink.path}
              >
                <div>
                  <Image
                    className="hidden md:block w-8 h-8"
                    src={subLink.icon}
                    alt={subLink.name}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-poppins text-base font-semibold text-textPrimary group-hover:underline">
                    {subLink.name}
                  </div>
                  <div className="hidden md:block font-poppins font-normal text-sm mt-2 text-textSecondary">
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
