import { Dialog } from "@mui/material";
import { CSSProperties } from "react";

interface IGenericDialogProps {
  children: React.ReactNode;
  open: boolean;
  width?: CSSProperties["width"];
  maxWidth?: CSSProperties["maxWidth"];
}

const GenericDialog = (props: IGenericDialogProps) => {
  return (
    <Dialog
      open={props.open}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          maxWidth: props.maxWidth || "80%",
          width: props.width || "auto",
        },
      }}
    >
      {props.children}
    </Dialog>
  );
};

export default GenericDialog;
