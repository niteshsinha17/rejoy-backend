import AppleStoreButton from "../appleStoreButton";
import GooglePlayButton from "../googlePlayButton";

const ButtonLink = (props) => {
  return <div>{props.children}</div>;
};

export const DownloadButtons = () => {
  return (
    <div className="flex justify-center space-x-4">
      <ButtonLink>
        <GooglePlayButton />
      </ButtonLink>
      <ButtonLink>
        <AppleStoreButton />
      </ButtonLink>
    </div>
  );
};

export default DownloadButtons;
