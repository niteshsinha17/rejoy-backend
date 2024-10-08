import { cn } from "@/utils";
import { CSSProperties } from "react";

export interface ITextLoaderProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
}
const BoxLoader = (props: ITextLoaderProps) => {
  return (
    <div
      style={{
        width: props.width || "100%",
        height: props.height || "50px",
      }}
      className={cn("bg-slate-200 animate-pulse rounded-md h-2", props.className)}
    ></div>
  );
};

export default BoxLoader;
