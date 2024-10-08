"use client";
import useNavState from "@/hooks/useNavState";
import { cn, stopPropagation } from "@/utils";
import { HTMLAttributes } from "react";
import Header from "../headers/base";

interface INavigationBackdropProps extends HTMLAttributes<HTMLDivElement> {}

export const NavigationBackdrop = ({ className, ...props }: INavigationBackdropProps) => {
  const navigationMenu = useNavState();

  return (
    <div
      className={cn(
        "bg-[#00000050] z-1300",
        "",
        "max-sm:fixed max-sm:translate-x-[-600px] max-sm:top-0 max-sm:left-0 max-sm:h-full max-sm:w-full",
        "transition-all duration-75 ease-in-out",
        {
          "max-sm:translate-x-0": navigationMenu.isOpen,
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
      className={cn("h-full z-1400 bg-white flex flex-col", "border-r", "w-[70px] lg:w-[300px]", "max-sm:w-[280px]", {
        // "sm:w-[70px] lg:w-[70px]": !navigationMenu.isOpen,
      })}
      {...props}
    />
  );
};

export const NavigationHeader = () => {
  return (
    <div className="h-[80px] w-full flex items-center px-3">
      <Header.Logo />
    </div>
  );
};

interface INavigationFooterProps {
  hideName: boolean;
}
export const NavigationFooter = (props: INavigationFooterProps) => {
  <div></div>;
};
