import styled from "@emotion/styled";
import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";

const ToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
  />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#333",
    color: "#fff",
    fontSize: 14,
    borderRadius: 8,
    padding: "8px 12px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#333",
  },
});
export default ToolTip;
