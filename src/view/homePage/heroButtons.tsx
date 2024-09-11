import Image from "next/image";
import { whatsAppIcon } from "../../../public/icons";
const HeroButtons = () => {
  return (
    <div className="flex justify-center ">
      <button className="flex items-center border mt-5 shadow rounded-3xl bg-[#20b356] hover:bg-[#1da851] ">
        <Image
        src={whatsAppIcon}
        alt="whatsApp-icon" 
        />
        <div className="mr-4 text-primaryBoder antialiased hover:subpixel-antialiased font-semibold">
          Ask on WhatsApp
        </div>
      </button>
      <button className="flex items-center border mt-5 ml-3 px-3 shadow rounded-3xl bg-slate-200 hover:bg-[rgb(213,223,226)] ">
        <div className="mx-4 text-green-100 antialiased hover:subpixel-antialiased font-semibold">
          Launch Web App
        </div>
      </button>
    </div>
  );
}

export default HeroButtons;