"use client";
import { IDoctorProfile } from "@/models/doctor";
import Avatar from "@/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils";
import MessageSuggestion from "../message-suggestion";
import "./style.css";

interface IFirstMessageProps {
  doctorProfile: IDoctorProfile;

  handleSubmit: (message: string) => void;
  hide: boolean;
  animate: boolean;
}

const FirstMessage = (props: IFirstMessageProps) => {
  const [animated, setAnimated] = useState(false);
  const freeImage = useRef<HTMLImageElement>(null);

  const animateImageToLocation = () => {
    const firstMessage = document.querySelectorAll("#message-container .message")[0];

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
    } else {
      // reset
      if (freeImage.current) {
        freeImage.current.classList.remove("profile-image-in-container");
        freeImage.current.style.left = "calc(50% - 100px)";
        freeImage.current.style.right = "100px";
      }
      setAnimated(false);
    }
  }, [props.animate]);

  return (
    <div
      className={cn("h-full w-full top-0 left-[50%] translate-x-[-50%] absolute max-w-screen-md", {
        "pointer-events-none": animated,
      })}
    >
      <div
        className={cn("bg-white w-full pb-[60px] h-full flex flex-col justify-end", "transition-all duration-500 ease-in-out", {
          "opacity-0": animated,
        })}
      >
        <div className="h-[200px]"></div>
        <MessageSuggestion
          doctorProfile={props.doctorProfile}
          handleSubmit={props.handleSubmit}
        />
      </div>
      <div
        ref={freeImage}
        className="profile-image z-30 flex"
      >
        <Avatar
          size="auto"
          fontSize="20px"
          name={props.doctorProfile.basicDetail.firstName + " " + props.doctorProfile.basicDetail.lastName}
          image={props.doctorProfile.basicDetail.image}
        />
      </div>
    </div>
  );
};

export default FirstMessage;
