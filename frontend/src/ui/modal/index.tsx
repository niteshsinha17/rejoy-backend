import { CloseIcon } from "@/icons";
import { Dialog, IconButton } from "@mui/material";
import { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  open: boolean;
  width?: CSSProperties["width"];
  maxWidth?: CSSProperties["maxWidth"];
  borderRadius?: CSSProperties["borderRadius"];
}

const Modal = ({ width = "90%", maxWidth = "600px", borderRadius = "16px", ...props }: IModalProps) => {
  return (
    <Dialog
      open={props.open}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: borderRadius,
          maxWidth: maxWidth,
          width: width,
        },
      }}
      fullWidth
    >
      {props.children}
    </Dialog>
  );
};

const Header = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="h-[60px] px-5 border-b flex justify-between items-center"
      {...props}
    />
  );
};

const HeaderTitle = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="text-base font-medium text-slate-900"
      {...props}
    />
  );
};

const HeaderCloseButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <IconButton onClick={props.onClick}>
      <CloseIcon className="icon-sm" />
    </IconButton>
  );
};

const ModalBody = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="p-5"
      {...props}
    />
  );
};

Modal.Header = Header;
Modal.HeaderTitle = HeaderTitle;
Modal.HeaderCloseButton = HeaderCloseButton;
Modal.Body = ModalBody;

export default Modal;
