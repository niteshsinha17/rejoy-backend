import ProfileImage from "@/../public/images/profile.png";
import Image from "next/image";
import { memo } from "react";
import "./style.css";
interface IAIMessageLoaderProps {
  showImage?: boolean;
}
const AIMessageLoader = (props: IAIMessageLoaderProps) => {
  return (
    <div className="flex message">
      <div className="w-[100px]" id="profile-image-container">
        {props.showImage && (
          <Image src={ProfileImage} alt="profile" height={70} width={70} />
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="px-[50px] rounded-xl text-base py-4">
          <div className="snippet" data-title="dot-pulse">
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
