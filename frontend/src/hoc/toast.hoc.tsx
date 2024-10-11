import { IChildrenProps } from "@/models/common/other";
import { Toaster } from "sonner";

export const ToastProvider = (props: IChildrenProps) => {
  return (
    <>
      {props.children}
      <Toaster
        richColors
        position="bottom-right"
      />
    </>
  );
};
