// import { Color, Size } from "@/enums";

// interface ISpinnerProps {
//   size?: Size;
//   color?: Color;
//   borderWidth?: string;
//   borderTopColor?: string;
// }

// const sizeMap: Record<Size, string> = {
//   xs: "0.5rem",
//   sm: "0.75rem",
//   md: "1rem",
//   lg: "1.25rem",
//   xl: "1.5rem",
// };

// const colorMap: Record<Color, string> = {
//   primary: "var(--primary)",
//   secondary: "var(--secondary)",
//   accent: "var(--accent)",
//   black: "var(--black)",
//   danger: "var(--danger)",
//   muted: "var(--muted)",
//   white: "white",
//   current: "currentColor",
// };

// const Spinner = (props: ISpinnerProps) => {
//   const size = sizeMap[props.size || "md"];
//   const color = colorMap[props.color || "primary"];

//   return (
//     <div
//       className={"circular-loader animate-spin rounded-full"}
//       style={{
//         border: `${props.borderWidth || "2px"} solid ${color}`,
//         borderTop: `${props.borderWidth || "2px"} solid ${
//           props.borderTopColor || "transparent"
//         }`,
//         height: size,
//         width: size,
//       }}
//     ></div>
//   );
// };

// export default Spinner;
