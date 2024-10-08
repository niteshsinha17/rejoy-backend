import { horizontalLineIcon, overviewIcon } from "../../../public/icons";
import Image from "next/image";

const Overview =({description}:{description:string})=>{
  return (
        <div className="flex bg-white shadow-sm rounded-lg p-4 my-5">
          <div>
            <Image src={overviewIcon} alt="icon" width={80}/>
          </div>
          <div className="ml-4">
            <p className="font-bold" >
              OVERVIEW
            </p>
            <Image src={horizontalLineIcon} alt="hl-icon" width={20}/>
            <div className="text-sm">
            {description}
            </div>
          </div>
        </div>
  )
}

export default Overview;