import Image from "next/image";

const LeftImageSection = (props: {
  img: string;
  imgAlt: string;
  heading?: string;
  para?: string;
  custom?: JSX.Element;
}) => {
  return (
    <div className="aligned-section grid grid-cols-2 gap-x-2 pt-[60px] items-center">
      <div>
        <Image
          className="max-w-sm mx-auto"
          src={props.img}
          alt={props.imgAlt}
        />
      </div>
      <div>
        {props.heading && (
          <h3 className="font-poppins font-semibold text-2xl text-textPrimary">
            {props.heading}
          </h3>
        )}

        {props.para && (
          <p className="font-manrope font-normal text-base mt-2 leading-loose text-textSecondary">
            {props.para}
          </p>
        )}

        {props.custom && props.custom}
      </div>
    </div>
  );
};

export default LeftImageSection;
