import YouTube from "@/../public/images/youtube.png";
import { useAppDispatch, useAppSelector } from "@/hooks/reducer";
import { IYoutubeVideoAttachment } from "@/models/chat";
import { chatActions } from "@/store/reducer/chat";
import { cn } from "@/utils";
import Image from "next/image";

interface IYouTubeVideosProps {
  video: IYoutubeVideoAttachment;
}

const YouTubeVideos = ({ video }: IYouTubeVideosProps) => {
  const selectedAttachment = useAppSelector((state) => state.chat.selectedAttachment);
  const dispatch = useAppDispatch();
  const handleSelectAttachment = () => {
    dispatch(chatActions.setSelectedAttachment(video));
  };

  return (
    <div
      onClick={handleSelectAttachment}
      className={cn("cursor-pointer flex items-center border rounded-xl p-5 py-3 gap-5", {
        "bg-[#F7F7F7]": selectedAttachment?.documentId === video.documentId,
      })}
    >
      <div>
        <Image
          src={YouTube}
          alt="youtube"
          height={40}
          width={40}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        {" "}
        <div className="text-xl font-serif font-semibold">{video.name}</div>
        <div className="text-[#828282] truncate">{video.description}</div>
      </div>
    </div>
  );
};

export default YouTubeVideos;
