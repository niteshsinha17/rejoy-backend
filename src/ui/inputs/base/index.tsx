import { Size } from "@/enum";
import { cn } from "@/utils";
import { InputHTMLAttributes, ReactNode } from "react";

interface IBaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  name: string;
  size?: Size;
  setValue: (name: string, value: string) => void;
  validateFn?: (value: string) => boolean;
  validateRegex?: RegExp;
}

export const BaseInput = ({ className, size = "sm", value, ...props }: IBaseInputProps) => {
  const inputSizeClass: Record<Size, string> = {
    xs: "h-8 text-xs",
    sm: "h-10 text-sm",
    md: "h-12 text-base",
    lg: "h-14 text-lg",
    xl: "h-16 text-xl",
  };

  return (
    <input
      onChange={(e) => {
        if (props.validateFn && !props.validateFn(e.target.value)) return;
        if (props.validateRegex && !props.validateRegex.test(e.target.value)) return;
        props.setValue(props.name, e.target.value);
      }}
      type="text"
      value={value}
      className={cn("outline-none border-none w-full bg-transparent", inputSizeClass[size], className)}
      {...props}
    />
  );
};

export const InputLabel = () => {
  return <></>;
};

interface IInputWrapperProps {
  children: ReactNode;
  error?: string;
  leadingVisual?: ReactNode;
  trailingVisual?: ReactNode;
}

export const InputWrapper = (props: IInputWrapperProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 bg-[#f2f2f2] rounded-lg p-2 px-3 border-2 border-transparent focus-within:border-black">
        {props.leadingVisual}
        {props.children}
        {props.trailingVisual}
      </div>
      {!!props.error && <div className="text-xs text-danger mt-1">{props.error}</div>}
    </div>
  );
};

export interface IInputProps extends Omit<IBaseInputProps, "children">, Omit<IInputWrapperProps, "children"> {}
