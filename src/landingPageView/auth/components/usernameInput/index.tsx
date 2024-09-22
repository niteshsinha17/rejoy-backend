import { usernameMaxLength } from "@/contants";
import { cn } from "@/utils";
import { trim } from "lodash";
import React from "react";
import classes from "./style.module.css";

interface IUsernameInputProps {
  value: string;
  name: string;
  setValue: (name: string, value: string) => void;
  error?: string;
  validateFn?: (value: string) => boolean;
  loading?: boolean;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  autoFocus?: boolean;
}

const UsernameInput = (props: IUsernameInputProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _username = trim(e.target.value);
    if (props.validateFn) {
      if (props.validateFn(_username)) {
        props.setValue(props.name, _username);
      }
    } else {
      props.setValue(props.name, _username);
    }
  };

  const hasError = Boolean(props.error);

  return (
    <div className={classes.inputWrapper}>
      <div className={cn(classes.input, hasError && classes.errorInput)}>
        <input
          ref={props.inputRef}
          maxLength={usernameMaxLength}
          type="text"
          placeholder={props.placeholder || "Username"}
          onChange={onChange}
          value={props.value}
          autoFocus={props.autoFocus}
        />
      </div>
      {hasError && <div className={cn("text-xs text-danger pl-2 my-1 h-5")}>{props.error}</div>}
    </div>
  );
};

export default UsernameInput;
