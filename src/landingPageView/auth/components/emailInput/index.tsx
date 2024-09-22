import { cn } from "@/utils";
import React from "react";
import classes from "./style.module.css";

interface IEmailInputProps {
  value: string;
  setValue: (name: string, value: string) => void;
  name: string;
  loading?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  error?: string;
}

const EmailInput = (props: IEmailInputProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(props.name, e.target.value);
  };

  const hasError = Boolean(props.error);

  return (
    <div className={classes.inputWrapper}>
      <div className={cn(classes.input, hasError && classes.errorInput)}>
        <input
          ref={props.inputRef}
          type="text"
          placeholder="Email"
          onChange={onChange}
          value={props.value}
        />
      </div>
      {hasError && <div className={cn("text-xs text-danger pl-2 my-1 h-5")}>{props.error}</div>}
    </div>
  );
};

export default EmailInput;
