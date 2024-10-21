import { Routes } from "@/enum";
import Image from "next/image";
import Link from "next/link";
import { appStore } from "../../../public/images";

const AppleStoreButton = () => {
  return (
    <Link href={Routes.APPLE_STORE}>
      <Image
        className="h-[50px] w-auto"
        src={appStore}
        alt="apple store"
      />
    </Link>
  );
};

export default AppleStoreButton;
