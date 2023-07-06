import Image from "next/image";

const LeftImageSection = (props: {
  img: string;
  imgAlt: string;
  heading?: string;
  para?: string;
  custom?: JSX.Element;
}) => {
  return (
    <div className="aligned-section md:grid grid-cols-1 md:grid-cols-2 md:gap-x-2 mb-4 md:mb-[0px] md:pt-[60px] items-center">
      <div>
        <Image
          width={500}
          height={1}
          className="max-w-sm mx-auto"
          src={props.img}
          alt={props.imgAlt}
        />
      </div>
      <div>
        {props.heading && (
          <h3 className="heading-4 text-textPrimary">{props.heading}</h3>
        )}

        {props.para && (
          <p className="body-1 mt-2 max-w-2xl text-textSecondary">
            {props.para}
          </p>
        )}

        {props.custom && props.custom}
      </div>
    </div>
  );
};

export default LeftImageSection;
