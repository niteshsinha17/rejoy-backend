import { cn } from "@/utils";
import { ReactNode } from "react";
import { IBaseInputProps } from "./interface";
import useInput from "./useInput";

export const BaseInput = (props: IBaseInputProps<HTMLInputElement>) => {
  const inputProps = useInput(props);

  if (inputProps.readOnly) {
    return <div className={inputProps.className}>{inputProps.value || "-"}</div>;
  }

  return <input {...inputProps} />;
};

export const BaseTextArea = (props: IBaseInputProps<HTMLTextAreaElement>) => {
  const inputProps = useInput(props);
  if (inputProps.readOnly) {
    return <div className={inputProps.className}>{inputProps.value || "-"}</div>;
  }
  return (
    <textarea
      rows={4}
      {...inputProps}
      style={{
        height: "auto",
      }}
    />
  );
};

interface IInputLabelProps {
  children: ReactNode;
  htmlFor?: string;
}
export const InputLabel = (props: IInputLabelProps) => {
  return (
    <label
      className="text-sm font-semibold"
      htmlFor={props.htmlFor}
    >
      {props.children}
    </label>
  );
};

interface IInputWrapperProps {
  children: ReactNode;
  error?: string;
  leadingVisual?: ReactNode;
  trailingVisual?: ReactNode;
  readOnly?: boolean;
  label?: string;
  variant?: "outline" | "filled";
}

export const InputWrapper = ({ variant = "filled", ...props }: IInputWrapperProps) => {
  return (
    <div className="flex flex-col">
      {!!props.label && <InputLabel>{props.label}</InputLabel>}
      <div
        className={cn("flex items-center gap-3 rounded-lg", {
          "px-3 border-2 border-transparent focus-within:border-black": !props.readOnly,
          "bg-[#f2f2f2]": variant === "filled",
          "border-border": variant === "outline",
          "mt-1": !props.readOnly && !!props.label,
        })}
      >
        {props.leadingVisual}
        {props.children}
        {props.trailingVisual}
      </div>
      {!!props.error && <div className="text-xs text-danger mt-1">{props.error}</div>}
    </div>
  );
};

export interface IInputProps
  extends Omit<IBaseInputProps<HTMLInputElement | HTMLTextAreaElement>, "children">,
    Omit<IInputWrapperProps, "children"> {}
