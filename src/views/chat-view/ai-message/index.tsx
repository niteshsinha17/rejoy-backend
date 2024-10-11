import { IChatMessage } from "@/models/chat";
import { IDoctorProfile } from "@/models/doctor";
import Avatar from "@/ui/avatar";
import { memo } from "react";
import Markdown from "react-markdown";
import "./style.css";

interface IAIMessageProps {
  message: IChatMessage;
  withoutImage?: boolean;
  doctorProfile: IDoctorProfile;
}

const AIMessage = ({ message, ...props }: IAIMessageProps) => {
  return (
    <div className="message flex">
      <div className="w-[100px]">
        {!props.withoutImage && (
          <div className="h-[70px] w-[70px]">
            <Avatar
              image={props.doctorProfile.basicDetail.image}
              name={props.doctorProfile.basicDetail.firstName}
              size="auto"
            />
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="px-5 py-4 rounded-xl text-base whitespace-pre-wrap">
          <Markdown className="markdown">{message.message}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default memo(AIMessage);
