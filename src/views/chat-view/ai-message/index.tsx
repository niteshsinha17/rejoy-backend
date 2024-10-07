import ProfileImage from "@/../public/images/profile.png";
import { PlayIcon } from "@/icons";
import { IChatMessage } from "@/models/chat";
import Image from "next/image";
import { memo } from "react";
import Markdown from "react-markdown";
import { useTextToSpeech } from "../context/speek-context";
import Books from "./books";
import GoogleDriveAttachments from "./google-drive-attachments";
import "./style.css";
import YouTubeVideos from "./you-tube-videos";

interface IAIMessageProps {
  message: IChatMessage;
  withoutImage?: boolean;
}

const AIMessage = ({ message, ...props }: IAIMessageProps) => {
  const { isPlaying, stop, textId, speak } = useTextToSpeech();
  const hasAttachment = Boolean(message.attachments?.length);

  return (
    <div className="message flex">
      <div className="w-[100px]">
        {!props.withoutImage && (
          <Image src={ProfileImage} alt="profile" height={70} width={70} />
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="px-5 py-4 rounded-xl text-base whitespace-pre-wrap">
          <div className="h-[30px]">
            {isPlaying && textId == message.id ? (
              <span onClick={stop} className="play-loader"></span>
            ) : (
              <span
                className="inline-flex items-center gap-2 cursor-pointer border rounded-full px-3 py-1 text-sm font-semibold"
                onClick={() => {
                  speak(message.message, message.id.toString());
                }}
              >
                <PlayIcon className="icon-sm" />
                Play
              </span>
            )}
          </div>
          <Markdown className="markdown">{message.message}</Markdown>
          {hasAttachment && (
            <>
              <div className="my-5 border-t"></div>
              <div className="space-y-5">
                {message.attachments?.map((attachment, index) => {
                  if (attachment.type === "drive") {
                    return (
                      <GoogleDriveAttachments
                        key={index}
                        attachment={attachment}
                      />
                    );
                  }
                  if (attachment.type === "youtube") {
                    return <YouTubeVideos key={index} video={attachment} />;
                  }
                  if (attachment.type === "book") {
                    return <Books key={index} book={attachment} />;
                  }
                  return null;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(AIMessage);
