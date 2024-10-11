import AppleStoreButton from "../appleStoreButton";
import GooglePlayButton from "../googlePlayButton";

export const DownloadButtons = () => {
  return (
    <div className="flex justify-center space-x-3">
      <GooglePlayButton />
      <AppleStoreButton />
    </div>
  );
};

export default DownloadButtons;
