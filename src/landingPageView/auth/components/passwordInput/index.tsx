import { VisibilityOffSolidIcon, VisibilitySolidIcon } from "@/icons";
import { Button } from "@/ui";
import clsx from "clsx";
import React, { useState } from "react";
import classes from "./style.module.css";

export interface IPasswordInputProps {
  value: string;
  name: string;
  setValue: (name: string, value: string) => void;
  placeholder?: string;
  error?: string;
}

const PasswordInput = (props: IPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(props.name, e.target.value);
  };

  const hasError = Boolean(props.error);

  return (
    <div className={classes.inputWrapper}>
      <div className={`${classes.input} ${props.error && classes.errorInput}`}>
        <input
          name={props.name}
          autoComplete="off"
          type={showPassword ? "text" : "password"}
          placeholder={props.placeholder}
          value={props.value}
          onChange={onChange}
        />
        <Button
          variant="icon"
          color="accent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <VisibilitySolidIcon /> : <VisibilityOffSolidIcon />}
        </Button>
      </div>
      {hasError && <div className={clsx("text-xs text-danger pl-2 my-1 h-5")}>{props.error}</div>}
    </div>
  );
};

export default PasswordInput;
