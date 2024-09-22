import Image from "next/image";

const RightImageSection = (props: {
  img: string;
  imgAlt: string;
  heading?: string;
  para?: string;
  custom?: JSX.Element;
}) => {
  return (
    <div className="aligned-section grid grid-cols-1 md:grid-cols-2 md:gap-x-2 md:pt-[60px] items-center">
      <div className="order-1 md:order-[0]">
        {props.heading && <h3 className="font-poppins font-semibold text-2xl text-textPrimary">{props.heading}</h3>}

        {props.para && <p className="font-manrope font-normal text-base mt-2 leading-loose max-w-2xl text-textSecondary">{props.para}</p>}

        {props.custom && props.custom}
      </div>
      <div className="order-[0] md:order-1">
        <Image
          width={500}
          height={500}
          className="max-w-sm mx-auto"
          src={props.img}
          alt={props.imgAlt}
        />
      </div>
    </div>
  );
};

export default RightImageSection;
