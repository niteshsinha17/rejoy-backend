const Container = (props) => {
  return <div className="container px-2 md:px-[0px] mx-auto md:w-[90%] lg:w-[80%] max-w-screen-lg">{props.children}</div>;
};

export default Container;
