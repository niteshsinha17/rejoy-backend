const Container = (props) => {
  return (
    <div className="container mx-auto md:w-[80%] max-w-[1500px]">
      {props.children}
    </div>
  );
};

export default Container;
