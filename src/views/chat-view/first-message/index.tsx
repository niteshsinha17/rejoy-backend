"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProfileImg from "../../../../public/images/profile.png";
import { cn } from "../../../utils";
import MessageSuggestion from "../message-suggestion";
import "./style.css";

interface IFirstMessageProps {
  handleSubmit: (message: string) => void;
  hide: boolean;
  animate: boolean;
}

const FirstMessage = (props: IFirstMessageProps) => {
  const [animated, setAnimated] = useState(false);
  const freeImage = useRef<HTMLImageElement>(null);

  const animateImageToLocation = () => {
    const firstMessage = document.querySelectorAll(
      "#message-container .message"
    )[0];

    if (firstMessage && freeImage.current) {
      const positionMessage = firstMessage.getBoundingClientRect();
      freeImage.current.classList.add("profile-image-in-container");
      freeImage.current.style.left = "0px";
      freeImage.current.style.top = positionMessage.height + 27 + "px";
    }
  };

  useEffect(() => {
    if (props.animate) {
      setAnimated(true);
      animateImageToLocation();
    }
  }, [props.animate]);

  return (
    <div
      className={cn(
        "h-full w-full top-0 left-[50%] translate-x-[-50%] absolute max-w-screen-md",
        {
          "pointer-events-none": animated,
        }
      )}
    >
      <div
        className={cn(
          "bg-white w-full pb-[60px] h-full flex flex-col justify-end",
          "transition-all duration-500 ease-in-out",
          {
            "opacity-0": animated,
          }
        )}
      >
        <div className="h-[200px]"></div>
        <MessageSuggestion handleSubmit={props.handleSubmit} />
      </div>
      <Image
        width={200}
        height={200}
        src={ProfileImg}
        ref={freeImage}
        alt="Profile Image"
        className="profile-image z-30"
      />
    </div>
  );
};

export default FirstMessage;
