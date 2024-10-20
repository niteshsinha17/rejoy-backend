import { Size } from "@/enum";
import { cn } from "@/utils";
import { ChangeEvent } from "react";
import { IBaseInputProps } from "./interface";

const inputSizeClass: Record<Size, string> = {
  xs: "h-xs text-xs",
  sm: "h-sm text-xs",
  md: "h-md text-sm",
  lg: "h-lg text-lg",
  xl: "h-xl text-xl",
};

const useInput = <T extends HTMLInputElement | HTMLTextAreaElement>({
  validateFn,
  validateRegex,
  size = "md",
  className,
  setValue,
  name,
  ...props
}: IBaseInputProps<T>) => {
  const onChange = (e: ChangeEvent<T>) => {
    if (validateFn && !validateFn(e.target.value)) return;
    if (validateRegex && !validateRegex.test(e.target.value)) return;
    setValue(name, e.target.value);
  };

  return {
    className: cn(
      "outline-none block border-none w-full bg-transparent py-1",
      inputSizeClass[size],

      className
    ),
    ...props,
    onChange,
  };
};

export default useInput;
