import { IChatMessage } from "@/models/chat";
import { memo } from "react";

interface IUserMessageProps {
  message: IChatMessage["message"];
}

const UserMessage = (props: IUserMessageProps) => {
  return (
    <div className="message flex justify-end">
      <div className="max-w-[70%] px-5 py-4 rounded-xl text-base bg-[#F5F5F5]">
        {props.message}
      </div>
    </div>
  );
};

export default memo(UserMessage);
