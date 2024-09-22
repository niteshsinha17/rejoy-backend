import { IChildrenProps } from "@/models";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";

export const ToastProvider = (props: IChildrenProps) => {
  return (
    <>
      {props.children}
      <ToastContainer
        style={{
          zIndex: 1400,
        }}
        position="bottom-right"
      />
      <Toaster
        richColors
        position="bottom-right"
      />
    </>
  );
};
