const Section = (props) => {
  return (
    <div className={`section py-[60px] sm:py-[120px] relative ${props.noBottomPadding ? "py:pb-[0px] sm:pb-[0px]" : ""}`}>
      {props.children}
    </div>
  );
};

export default Section;
