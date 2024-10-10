import { Size } from "@/enum";
import { InputHTMLAttributes } from "react";

export interface IBaseInputProps<T> extends Omit<InputHTMLAttributes<T>, "size"> {
  name: string;
  size?: Size;
  setValue: (name: string, value: string) => void;
  validateFn?: (value: string) => boolean;
  validateRegex?: RegExp;
}
