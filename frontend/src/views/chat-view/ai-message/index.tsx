import { IChatMessage } from "@/models/chat";
import { IDoctorProfile } from "@/models/doctor";
import Avatar from "@/ui/avatar";
import { memo } from "react";
import Markdown from "react-markdown";
import "./style.css";

interface IAIMessageProps {
  message: IChatMessage;
  doctorProfile: IDoctorProfile;
}

const AIMessage = ({ message, ...props }: IAIMessageProps) => {
  return (
    <div className="message flex">
      <div className="max-sm:hidden w-[100px]">
        <div className="h-[70px] w-[70px]">
          <Avatar
            image={props.doctorProfile.basicDetail.image}
            name={props.doctorProfile.basicDetail.firstName}
            size="auto"
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="p-2 sm:px-5 sm:py-4 rounded-xl text-base whitespace-pre-wrap">
          <Markdown className="markdown">{message.message}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default memo(AIMessage);
