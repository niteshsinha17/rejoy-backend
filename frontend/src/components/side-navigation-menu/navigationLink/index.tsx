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
          "flex items-center gap-3 hover:text-primary p-2 font-medium rounded-lg cursor-pointer sm:justify-center lg:justify-normal",
          {
            "text-primary bg-opacity-50": props.isActive,
          }
        )}
      >
        <span
          className={cn("text-slate-400", {
            "text-primary": props.isActive,
          })}
        >
          {props.icon}
        </span>
        <div className="font-semibold">{props.name}</div>
      </Link>
    );
  }
  return (
    <div
      className={cn("flex items-center gap-3 hover:text-primary p-2 rounded-lg cursor-pointer sm:justify-center lg:justify-normal")}
      onClick={props.action}
    >
      <span className="text-slate-400">{props.icon}</span>
      <div className="font-semibold">{props.name}</div>
    </div>
  );
};

export default NavigationLink;
