import Avatar from "@/ui/avatar";
import { memo } from "react";
import "./style.css";

const AIMessageLoader = () => {
  return (
    <div className="flex message">
      <div
        className="w-[100px]"
        id="profile-image-container"
      >
        <div className="h-[70px] w-[70px]">
          <Avatar
            image=""
            name="Rejoy"
            size="auto"
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="px-[50px] rounded-xl text-base py-4">
          <div
            className="snippet"
            data-title="dot-pulse"
          >
            <div className="stage">
              <div className="dot-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AIMessageLoader);
