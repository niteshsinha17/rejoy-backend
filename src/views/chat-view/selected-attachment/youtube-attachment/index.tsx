"use client";
// import BookOne from "../../../../public/images/book1.png";
import { useAppSelector } from "@/hooks";
import { IYoutubeVideoAttachment } from "@/models/chat";
import Link from "next/link";

function getYouTubeVideoID(url: string) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get("v");
}

const YoutubeAttachment = () => {
  const video = useAppSelector(
    (state) => state.chat.selectedAttachment
  ) as IYoutubeVideoAttachment;

  if (!video) return null;

  return (
    <div className="p-5 h-full overflow-y-auto space-y-4">
      <iframe
        className="w-full object-cover"
        src={`https://www.youtube.com/embed/${getYouTubeVideoID(video.url)}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div className="border-b pb-4 space-y-2">
        {/* <div className="text-[#828282]">
          {video.dateTime && formatDateInDateMonthYear(video.dateTime)}{" "}
        </div> */}
        <div className="text-2xl font-serif font-medium">{video.name}</div>
        {/* <div className="text-[#828282]">
              John J. Mearsheimer and Sebastian Rosato
            </div> */}
      </div>

      <div>{video.description}</div>
      <Link
        href={video.url}
        target="_blank"
        className="flex text-sm w-fit gap-2 p-4 py-3 border border-black hover:text-white hover:bg-black font-medium items-center"
      >
        Open in Youtube
      </Link>
    </div>
  );
};

export default YoutubeAttachment;
