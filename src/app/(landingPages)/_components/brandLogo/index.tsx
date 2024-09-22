import Image from "next/image";
import Link from "next/link";
import { Logo } from "../../../../../public/images";

const BrandLogo = () => {
  return (
    <Link href="/">
      <Image
        className="h-[40px] w-auto"
        src={Logo}
        alt="rejoy"
      />
    </Link>
  );
};

export default BrandLogo;
