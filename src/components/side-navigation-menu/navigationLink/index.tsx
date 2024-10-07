"use client";
import { cn } from "@/utils";
import Link from "next/link";
import { ReactNode } from "react";

export interface INavigationItem {
  name: string;
  icon: ReactNode;
  type: "link" | "action";
  redirectTo?: string;
  isActive?: boolean;
  action?: () => void;
}

export interface INavigationLinkProps extends INavigationItem {}

const NavigationLink = (props: INavigationLinkProps) => {
  if (props.type === "link" && props.redirectTo) {
    return (
      <Link
        onClick={(e) => {
          if (props.isActive) e.preventDefault();
        }}
        href={props.redirectTo}
        className={cn(
          "flex items-center gap-3 hover:bg-accent hover:text-primary p-2 py-1 font-medium rounded-lg cursor-pointer sm:justify-center lg:justify-normal",
          {
            "bg-accent text-primary bg-opacity-50": props.isActive,
          }
        )}
      >
        {props.icon}
        <div>{props.name}</div>
      </Link>
    );
  }
  return (
    <div
      className={cn(
        "flex items-center gap-3 hover:bg-secondary p-2 rounded-lg cursor-pointer sm:justify-center lg:justify-normal"
        // props.collapsedSidebar && "lg:justify-center"
      )}
      onClick={props.action}
    >
      {props.icon}
      <div
        className={cn("sm:hidden lg:block max-sm:text-base text-slate-600", {
          // "lg:hidden": props.collapsedSidebar,
        })}
      >
        {props.name}
      </div>
    </div>
  );
};

export default NavigationLink;
