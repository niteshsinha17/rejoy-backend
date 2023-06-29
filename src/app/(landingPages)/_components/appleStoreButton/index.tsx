import { ROUTES } from "@/enum";
import Image from "next/image";
import Link from "next/link";
import { appStore } from "../../../../../public/images";

const AppleStoreButton = () => {
  return (
    <Link href={ROUTES.APPLE_STORE} className="apple-store-button">
      <Image className="h-[60px] w-[180px]" src={appStore} alt="apple store" />
    </Link>
  );
};

export default AppleStoreButton;
