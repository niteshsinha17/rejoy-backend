"use client";
import { cn } from "@/utils/common";
import { type VariantProps, cva } from "cva";
import React, { CSSProperties, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex py-2 font-medium gap-2 no-underline items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        solid: "border border-transparent",
        outline: "border border-currentcolor",
        text: "",
        icon: "border icon-button p-0 flex justify-center items-center text-slate-400",
      },
      fontSize: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "",
        xl: "text-lg",
      },
      size: {
        xs: "h-8 px-4 text-xs",
        sm: "h-10 px-2 text-sm",
        md: "h-12 px-3 text-base sm:text-base",
        lg: "h-14 px-4 text-base sm:text-lg",
        xl: "h-16 px-6 text-base sm:text-lg",
      },
      borderType: {
        circle: "rounded-full",
        rounded: "rounded-lg",
        square: "rounded-none",
      },
      color: {
        primary: "",
        secondary: "",
        danger: "",
        muted: "",
        accent: "",
        black: "",
        success: "",
        white: "",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 pointer-events-none",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "solid",
      fontSize: "sm",
      size: "sm",
      borderType: "rounded",
      color: "primary",
      fullWidth: false,
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "primary",
        className: "bg-primary text-white hover:bg-primary/90",
      },
      {
        variant: "solid",
        color: "secondary",
        className: "bg-secondary text-black hover:bg-secondary/90",
      },
      {
        variant: "solid",
        color: "danger",
        className: "bg-danger text-white hover:bg-danger/90",
      },
      {
        variant: "solid",
        color: "muted",
        className: "bg-muted text-muted-foreground hover:bg-muted/90",
      },
      {
        variant: "solid",
        color: "accent",
        className: "bg-accent text-accent-foreground hover:bg-accent/90",
      },
      {
        variant: "solid",
        color: "black",
        className: "bg-black text-white hover:bg-black/90",
      },
      {
        variant: "solid",
        color: "success",
        className: "bg-success text-white hover:bg-success/90",
      },
      {
        variant: "solid",
        color: "white",
        className: "bg-white text-black hover:bg-gray-100",
      },
      {
        variant: "outline",
        color: "primary",
        className: "text-primary border-primary",
      },
      {
        variant: "outline",
        color: "secondary",
        className: "text-secondary border",
      },
      {
        variant: "outline",
        color: "danger",
        className: "text-danger border-danger",
      },
      {
        variant: "outline",
        color: "muted",
        className: "text-muted-foreground border-muted-foreground",
      },
      {
        variant: "outline",
        color: "accent",
        className: "text-accent-foreground border-accent-foreground",
      },
      {
        variant: "outline",
        color: "black",
        className: "text-black border-[#c9c9cd] hover:bg-[#f3f3f3]",
      },
      {
        variant: "outline",
        color: "success",
        className: "text-success border-success",
      },
      {
        variant: "text",
        color: "primary",
        className: "text-primary",
      },
      {
        variant: "text",
        color: "secondary",
        className: "text-secondary-foreground hover:bg-secondary",
      },
      {
        variant: "text",
        color: "danger",
        className: "text-danger hover:underline",
      },
      {
        variant: "text",
        color: "muted",
        className: "text-muted-foreground hover:bg-muted",
      },
      {
        variant: "text",
        color: "accent",
        className: "text-accent-foreground hover:bg-accent",
      },
      {
        variant: "text",
        color: "black",
        className: "text-black",
      },
      {
        variant: "text",
        color: "success",
        className: "text-success",
      },
      {
        variant: "icon",
        size: "xs",
        className: "h-[32px] w-[32px] p-0",
      },
      {
        variant: "icon",
        size: "sm",
        className: "h-[36px] w-[36px] p-0 icon-button-sm",
      },
      {
        variant: "icon",
        size: "md",
        className: "p-2",
      },
      {
        variant: "icon",
        size: "lg",
        className: "p-2",
      },
      {
        variant: "icon",
        size: "xl",
        className: "p-3",
      },
    ],
  }
);

export interface IButtonProps extends VariantProps<typeof buttonVariants> {
  href?: string;
  loading?: boolean;
  spinnerPlacement?: "start" | "end";
  target?: "_blank" | "_self" | "_parent" | "_top";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  label?: ReactNode; // remove later
  minWidth?: CSSProperties["minWidth"];
}

export const useButtonProps = (props: IButtonProps) => {
  const onClick = () => {
    if (props.loading || props.disabled) return;

    props.onClick && props.onClick();
  };
  const getButtonProps = () => {
    return {
      onClick: onClick,
      className: cn(
        buttonVariants({
          variant: props.variant,
          color: props.color,
          size: props.size,
          borderType: props.borderType,
          fontSize: props.fontSize,
          fullWidth: props.fullWidth,
          disabled: props.disabled,
        }),
        props.className
      ),
      style: {
        minWidth: props.minWidth,
      },
    };
  };

  return {
    getButtonProps,
    spinnerPlacement: props.spinnerPlacement || "start",
    spinnerSize: props.size || "md",
  };
};
