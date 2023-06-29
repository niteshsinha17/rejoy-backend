import Image from "next/image";
import { Logo } from "../../../../../public/images";

const BrandLogo = () => {
  return <Image className="h-[40px] w-auto" src={Logo} alt="rejoy" />;
};

export default BrandLogo;
