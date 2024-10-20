"use client";
import useNavState from "@/hooks/useNavState";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";
import { Button } from "@/ui";
import { cn, stopPropagation } from "@/utils";
import { HTMLAttributes } from "react";
import Header from "../headers/base";

interface INavigationBackdropProps extends HTMLAttributes<HTMLDivElement> {}

export const NavigationBackdrop = ({ className, ...props }: INavigationBackdropProps) => {
  const navigationMenu = useNavState();

  return (
    <div
      className={cn(
        "z-[1300]",
        "",
        "max-md:fixed max-md:top-0 max-md:left-0 max-md:h-full max-md:w-full",
        "transition-all duration-300 ease-in-out",
        {
          "max-md:pointer-events-none": navigationMenu.isOpen,
          "bg-[#0000007d]": !navigationMenu.isOpen,
        },
        className
      )}
      onClick={navigationMenu.close}
      {...props}
    />
  );
};

interface INavigationSidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const NavigationSidebar = (props: INavigationSidebarProps) => {
  const navigationMenu = useNavState();

  return (
    <div
      onClick={stopPropagation}
      className={cn(
        "h-full z-1400 bg-white flex flex-col",
        "border-r",
        "w-[300px]",
        "max-md:w-[280px]",
        "transition-all duration-300 ease-in-out",
        {
          "max-md:ml-[0px] md:ml-[-300px]": !navigationMenu.isOpen,
          "max-md:ml-[-300px] md:ml-[0px]": navigationMenu.isOpen,
        }
      )}
      {...props}
    />
  );
};

export const NavigationHeader = () => {
  const navigationMenu = useNavState();

  return (
    <div className="h-[80px] w-full flex items-center px-3 relative">
      <Header.Logo />
      <span
        className={cn("absolute right-[-18px] bg-white cursor-pointer z-10", "transition-all duration-300 ease-in-out", {
          "right-[-60px] max-md:hidden": !navigationMenu.isOpen,
          "max-md:opacity-0": navigationMenu.isOpen,
        })}
      >
        <Button
          onClick={navigationMenu.toggle}
          variant="icon"
        >
          {navigationMenu.isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </Button>
      </span>
    </div>
  );
};

interface INavigationFooterProps {
  hideName: boolean;
}
export const NavigationFooter = (props: INavigationFooterProps) => {
  <div></div>;
};
