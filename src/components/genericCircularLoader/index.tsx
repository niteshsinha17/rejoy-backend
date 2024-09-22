interface IGenericCircularLoaderProps {
  size?: string;
  color?: string;
  borderWidth?: string;
  borderTopColor?: string;
  override?: boolean;
}

const GenericCircularLoader = (props: IGenericCircularLoaderProps) => {
  return (
    <div
      className={" circular-loader animate-spin rounded-full"}
      style={
        props.override
          ? {
              height: props.size || "1rem",
              width: props.size || "1rem",
            }
          : {
              border: `${props.borderWidth || "2px"} solid ${props.color || "var(--primary-color)"}`,

              borderTop: `${props.borderWidth || "2px"} solid ${props.borderTopColor || "white"}`,
              height: props.size || "1rem",
              width: props.size || "1rem",
            }
      }
    ></div>
  );
};

export default GenericCircularLoader;
