import { useAppSelector } from "@/hooks";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import ActionHeader from "./action-header";
import BookAttachment from "./book-information";
import DriveAttachment from "./drive-attachment";
import YoutubeAttachment from "./youtube-attachment";

const SelectedAttachment = () => {
  const [show, setShow] = useState(false);
  const selectedAttachment = useAppSelector(
    (state) => state.chat.selectedAttachment
  );

  useEffect(() => {
    setTimeout(() => {
      setShow(Boolean(selectedAttachment));
    }, 300);
  }, [selectedAttachment]);

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out h-full",
        "w-[400px] border-l shadow-lg",
        { "w-[0px]": !selectedAttachment }
      )}
    >
      {show && (
        <div className="flex flex-col h-full">
          <ActionHeader />
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              {selectedAttachment?.type === "drive" && <DriveAttachment />}
              {selectedAttachment?.type === "youtube" && <YoutubeAttachment />}
              {selectedAttachment?.type === "book" && <BookAttachment />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedAttachment;
