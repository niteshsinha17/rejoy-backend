"use client";
import DriveImg from "@/../public/images/google-drive.png";
import { useAppSelector } from "@/hooks";
import { IGoogleDriveAttachment } from "@/models/chat";
import Image from "next/image";
import Link from "next/link";
const DriveAttachment = () => {
  const attachment = useAppSelector(
    (state) => state.chat.selectedAttachment
  ) as IGoogleDriveAttachment;

  if (!attachment) return null;

  return (
    <div className="p-5 h-full overflow-y-auto space-y-4">
      <Image src={DriveImg} height={50} alt="Book One" />
      <div className="border-b pb-4 space-y-2">
        <div className="text-2xl font-serif font-medium">{attachment.name}</div>
      </div>
      <div className="">{attachment.description}</div>
      <Link
        href={attachment.url}
        target="_blank"
        className="flex text-sm w-fit gap-2 p-4 py-3 border border-black hover:text-white hover:bg-black font-medium items-center"
      >
        Open in Google Drive
      </Link>
    </div>
  );
};

export default DriveAttachment;
