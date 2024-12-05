import { IChatMessage } from "@/models/chat";
import Avatar from "@/ui/avatar";
import { memo } from "react";
import { LogoMini } from "../../../../public/images";
import "./style.css";

interface IAIMessageProps {
  message: IChatMessage;
  withoutImage?: boolean;
}

const AIMessage = ({ message, ...props }: IAIMessageProps) => {
  return (
    <div className="message flex">
      <div className="w-[100px] max-sm:hidden">
        {!props.withoutImage && (
          <div className="h-[70px] w-[70px]">
            <Avatar
              image={LogoMini.src}
              name="Rejoy"
              size="auto"
            />
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="p-2 sm:px-5 sm:py-4 rounded-xl text-base whitespace-pre-wrap">
          {/* <Markdown className="markdown">{message.message}</Markdown> */}
        </div>
      </div>
    </div>
  );
};

export default memo(AIMessage);
