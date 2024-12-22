import Image from "next/image";
import { ReactNode } from "react";

const LeftImageSection = (props: {
  img: string;
  imgAlt: string;
  heading?: string | ReactNode;
  para?: string | string[] | ReactNode;
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
        {typeof props.heading === "string" && <h3 className="heading-4 text-black">{props.heading}</h3>}
        {typeof props.heading !== "string" && props.heading}

        {typeof props.para === "string" && <p className="body-1 mt-2 max-w-2xl text-textSecondary">{props.para}</p>}

        {Array.isArray(props.para) && (
          <div className="space-y-2 max-w-2xl mt-2">
            {props.para.map((p, i) => (
              <p
                key={i}
                className="body-1 text-textSecondary"
              >
                {p}
              </p>
            ))}
          </div>
        )}

        {props.custom && props.custom}
      </div>
    </div>
  );
};

export default LeftImageSection;
