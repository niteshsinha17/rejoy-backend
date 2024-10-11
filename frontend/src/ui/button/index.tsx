"use client";
import Link from "next/link";
import Spinner from "../spinner";
// import Spinner from "../spinner";
import { IButtonProps, useButtonProps } from "./use-button";

const Button = (props: IButtonProps) => {
  const { spinnerPlacement, spinnerSize, getButtonProps } = useButtonProps(props);

  if (props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        {...getButtonProps()}
      >
        {spinnerPlacement === "start" && props.loading && (
          <Spinner
            color="current"
            size={spinnerSize}
          />
        )}
        {props.startIcon}
        {props.children}
        {props.endIcon}
        {spinnerPlacement === "end" && props.loading && (
          <Spinner
            color="current"
            size={spinnerSize}
          />
        )}
      </Link>
    );
  }

  return (
    <button
      type={props.type || "button"}
      {...getButtonProps()}
    >
      {spinnerPlacement === "start" && props.loading && (
        <Spinner
          color="current"
          size={spinnerSize}
        />
      )}
      {props.startIcon}
      {props.children}
      {props.label}
      {props.endIcon}
      {spinnerPlacement === "end" && props.loading && (
        <Spinner
          color="current"
          size={spinnerSize}
        />
      )}
    </button>
  );
};

export default Button;
