"use client";

import Image from "next/image";
import { useState } from "react";
import { arrowDownIcon } from "../../../public/icons";

export const Accordion = (props: {
  heading: string | JSX.Element;
  content: string | JSX.Element;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        props.className ? props.className : ""
      } border-b border-b-primaryBoder py-4`}
    >
      <div className="flex items-center cursor-pointer" onClick={toggle}>
        <div className="flex-1">
          {typeof props.heading === "string" ? (
            <h3 className="heading-4 font-normal">{props.heading}</h3>
          ) : (
            props.heading
          )}
        </div>
        <div>
          <Image
            className={`h-3 w-3 transition-all duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            src={arrowDownIcon}
            alt="arrow-down"
          />
        </div>
      </div>
      <div>
        <div
          className={`body-1 ${
            isOpen
              ? "max-h-[1000px] opacity-100 pt-2"
              : "max-h-[0px] opacity-0 pt-0"
          } transition-all duration-200 overflow-hidden `}
        >
          {typeof props.content === "string" ? (
            <p>{props.content}</p>
          ) : (
            props.content
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
