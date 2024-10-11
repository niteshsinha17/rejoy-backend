import { Size } from "@/enum";
import { cn } from "@/utils/common";
import { Avatar as MuiAvatar } from "@mui/material";

interface IGenericAvatarProps {
  image?: string;
  size?: Size | "auto";
  name?: string;
  fontSize?: string;
  isOnline?: boolean;
  showOffline?: boolean;
  showOnlineStatus?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const avatarSizeClassMap: Record<Size | "auto", string> = {
  xs: "h-[20px] w-[20px] text-xs",
  sm: "h-[30px] w-[30px] text-[10px]",
  md: "h-[40px] w-[40px] text-sm",
  lg: "h-[70px] w-[70px] text-base",
  xl: "h-[100px] w-[100px] text-xl",
  auto: "h-full w-full",
};

const charToColorMap: Record<string, string> = {
  a: "#FF5733",
  b: "#33FF57",
  c: "#5733FF",
  d: "#FF33A1",
  e: "#A133FF",
  f: "#33FFC1",
  g: "#FFD233",
  h: "#339CFF",
  i: "#FF3333",
  j: "#33FFAA",
  k: "#FF33FF",
  l: "#33FF33",
  m: "#FF33C1",
  n: "#33A1FF",
  o: "#FF5733",
  p: "#33FF57",
  q: "#5733FF",
  r: "#FF33A1",
  s: "#A133FF",
  t: "#33FFC1",
  u: "#FFD233",
  v: "#339CFF",
  w: "#FF3333",
  x: "#33FFAA",
  y: "#FF33FF",
  z: "#33FF33",
};

const Avatar = (props: IGenericAvatarProps) => {
  const char = (props.name && props.name[0]?.toLocaleLowerCase()) || "a";

  return (
    <span
      className={cn(
        avatarSizeClassMap[props.size || "md"],
        "inline-flex rounded-full relative",
        props.isLoading && "bg-slate-200 animate-pulse"
      )}
    >
      <MuiAvatar
        src={props.image}
        onClick={props.onClick}
        className={cn(props.onClick && "cursor-pointer")}
        sx={{
          width: "100%",
          height: "100%",
          background: charToColorMap[char],
          visibility: props.isLoading ? "hidden" : "visible",
          fontSize: props.fontSize,
          maxWidth: props.size === "auto" ? "100%" : 100,
          maxHeight: props.size === "auto" ? "100%" : 100,
        }}
      >
        {char.toUpperCase()}
      </MuiAvatar>
      {/* {props.showOnlineStatus && props.isOnline && (
        <OnlineIcon
          style={{
            height: "14px",
            width: "14px",
          }}
          className="absolute z-2 right-[-5%] bottom-[5%] "
        />
      )} */}
    </span>
  );
};

export default Avatar;
