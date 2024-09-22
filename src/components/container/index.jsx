const Container = (props) => {
  return <div className="container px-3 md:px-[0px] mx-auto md:w-[90%] lg:w-[80%] max-w-[1500px]">{props.children}</div>;
};

export default Container;
