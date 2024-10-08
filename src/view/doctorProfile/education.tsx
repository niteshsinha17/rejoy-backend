import { capIcon, horizontalLineIcon } from "../../../public/icons";
import Image from "next/image";

const Education =({schoolName,graduationYear,residency}:{schoolName:string,graduationYear:string,residency:string})=>{
  return (
        <div className="flex bg-white shadow-sm rounded-lg p-4 my-5">
          <div>
            <Image src={capIcon} alt="icon" width={35}/>
          </div>
          <div className="ml-4">
            <p className="font-bold" >
              CERTIFICATIONS & EDUCATION
            </p>
            <Image src={horizontalLineIcon} alt="hl-icon" width={20} className="mb-3"/>
            <div className="text-sm space-y-2">
              <p className="font-semibold mb-2">EDUCATION & TRAINING</p>
              <div className="mb-3">
              <p>MEDICAL SCHOOL</p>
                <p>{schoolName}</p>
                <p>Graduated {graduationYear}</p>
              </div>
              <div>
                <p>RESIDENCY</p>
                <p>{residency}</p>
              </div>
            </div>
          </div>
        </div>
  )

}

export default Education;