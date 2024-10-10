import DriveImage from "@/../public/images/google-drive.png";
import { useAppDispatch, useAppSelector } from "@/hooks/reducer";
import { IGoogleDriveAttachment } from "@/models/chat";
import { chatActions } from "@/store/reducer/chat";
import { cn } from "@/utils";
import Image from "next/image";
interface IGoogleDriveAttachmentsProps {
  attachment: IGoogleDriveAttachment;
}

const GoogleDriveAttachments = ({ attachment }: IGoogleDriveAttachmentsProps) => {
  const selectedAttachment = useAppSelector((state) => state.chat.selectedAttachment);
  const dispatch = useAppDispatch();
  const handleSelectAttachment = () => {
    dispatch(chatActions.setSelectedAttachment(attachment));
  };

  return (
    <div
      onClick={handleSelectAttachment}
      className={cn("cursor-pointer flex items-center border rounded-xl p-5 py-3 gap-5", {
        "bg-[#F7F7F7]": selectedAttachment?.documentId === attachment.documentId,
      })}
    >
      <div>
        <Image
          src={DriveImage}
          alt="google drive"
          height={40}
          width={40}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="text-xl font-serif font-semibold">{attachment.name}</div>
        <div className="text-[#828282] truncate">{attachment.description}</div>
      </div>
    </div>
  );
};

export default GoogleDriveAttachments;
