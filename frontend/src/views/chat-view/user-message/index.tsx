import { IChatMessage } from "@/models/chat";
import { memo } from "react";

interface IUserMessageProps {
  message: IChatMessage["message"];
}

const UserMessage = (props: IUserMessageProps) => {
  return (
    <div className="message flex justify-end">
      <div className="max-w-[70%] px-3 py-2 rounded-xl bg-secondary">{props.message}</div>
    </div>
  );
};

export default memo(UserMessage);
