import { Routes } from "@/enum";
import Image from "next/image";
import Link from "next/link";
import { googlePlay } from "../../../public/images";

const GooglePlayButton = () => {
  return (
    <Link
      href={Routes.GOOGLE_PLAY}
      target="_blank"
    >
      <Image
        className="h-[50px] w-auto"
        src={googlePlay}
        alt="google-play-button"
      />
    </Link>
  );
};

export default GooglePlayButton;
