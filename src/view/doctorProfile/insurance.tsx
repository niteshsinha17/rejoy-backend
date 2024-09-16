import { capIcon, horizontalLineIcon } from "../../../public/icons";
import Image from "next/image";

const Insurance =({description}:{description:string[]})=>{
  return (
        <div className="flex bg-white shadow-sm rounded-lg p-4 my-5">
          <div>
            <Image src={capIcon} alt="icon" width={35}/>
          </div>
          <div className="ml-4">
            <p className="font-bold" >
              INSURANCE PLAN ACCEPTED
            </p>
            <Image src={horizontalLineIcon} alt="hl-icon" width={20} className="mb-3"/>
            <p className="text-sm mb-2">Please verify insurance information directly with your doctor's office as it may change frequently.</p>
            <div className="grid grid-cols-2">
              {[...description].map((_,i)=>(
                  <p className="text-sm">{description[i]}</p>
                ))}
            </div>
          </div>
          
        </div>
  )

}

export default Insurance;