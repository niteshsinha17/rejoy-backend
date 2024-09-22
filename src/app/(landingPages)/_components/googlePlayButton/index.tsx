import { ROUTES } from "@/enum";
import Image from "next/image";
import Link from "next/link";
import { googlePlay } from "../../../../../public/images";

const GooglePlayButton = () => {
  return (
    <Link
      href={ROUTES.GOOGLE_PLAY}
      target="_blank"
    >
      <Image
        className="h-[50px] w-[150px] sm:h-[60px] sm:w-[180px]"
        src={googlePlay}
        alt="google-play-button"
      />
    </Link>
  );
};

export default GooglePlayButton;
