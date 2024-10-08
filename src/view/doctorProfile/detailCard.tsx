import { horizontalLineIcon } from "../../../public/icons";
import Image from "next/image";

interface DetailCardProps {
  iconSrc: string,
  heading:string,
  description: string[],

}
const DetailCard =({iconSrc,heading,description}:DetailCardProps)=>{
  return (
        <div className="flex bg-white shadow-sm rounded-lg p-4 my-5">
          <div>
            <Image src={iconSrc} alt="icon" width={35}/>
          </div>
          <div className="ml-4">
            <p className="font-bold" >
              {heading}
            </p>
            <Image src={horizontalLineIcon} alt="hl-icon" width={20} className="mb-3"/>
            <div className="text-sm space-y-2">
            {[...description].map((_,i)=>(
              <p>{description[i]}</p>
            ))}
            </div>
          </div>
        </div>
  )

}

export default DetailCard;