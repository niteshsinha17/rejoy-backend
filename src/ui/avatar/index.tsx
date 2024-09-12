// // import { IAvatarSize, avatarSizeClassMap, charToColorMap } from "@/constants";
// // import { OfflineIcon, OnlineIcon } from "@/static/icons";
// import { cn } from "@/utils/common";
// import { Avatar as MuiAvatar } from "@mui/material";

// interface IGenericAvatarProps {
//   image?: string;
//   size?: IAvatarSize;
//   name?: string;
//   isOnline?: boolean;
//   showOffline?: boolean;
//   isLoading?: boolean;
//   onClick?: () => void;
// }

// const Avatar = (props: IGenericAvatarProps) => {
//   const char = (props.name && props.name[0]?.toLocaleLowerCase()) || "a";

//   return (
//     <span
//       className={cn(
//         avatarSizeClassMap[props.size || "md"],
//         "inline-flex rounded-full relative",
//         props.isLoading && "bg-slate-200 animate-pulse"
//       )}
//     >
//       <MuiAvatar
//         src={props.image}
//         onClick={props.onClick}
//         className={cn(props.onClick && "cursor-pointer")}
//         sx={{
//           width: "100%",
//           height: "100%",
//           background: charToColorMap[char],
//           visibility: props.isLoading ? "hidden" : "visible",
//           fontSize: "unset",
//         }}
//       >
//         {char.toUpperCase()}
//       </MuiAvatar>
//       {props.isOnline && (
//         <OnlineIcon
//           style={{
//             height: "14px",
//             width: "14px",
//           }}
//           className="absolute z-2 right-[-5%] bottom-[5%] "
//         />
//       )}
//       {props.showOffline && !props.isOnline && (
//         <OfflineIcon
//           style={{
//             height: "14px",
//             width: "14px",
//           }}
//           className="absolute z-2 right-[-5%] bottom-[5%] "
//         />
//       )}
//     </span>
//   );
// };

// export default Avatar;
