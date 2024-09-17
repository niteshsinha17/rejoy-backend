import Image from "next/image";
import {
  locationIcon,
  phoneIcon,
  sparkleAI,
} from "../../../public/icons";
interface DoctorDetailProps {
  name: string;
  specialties: string[];
  practiceName: string;
  address: string;
  phoneNumber: string;
  imageUrl: string;
}

const DoctorDetail = ({
  name,
  specialties,
  practiceName,
  address,
  phoneNumber,
  imageUrl,
}: DoctorDetailProps) => {
  return (
    <div className="flex items-start p-4  my-5 bg-white shadow-sm rounded-lg">
      <img
        src={imageUrl}
        alt={name}
        width={120}
        className="rounded-full mr-4"
      />
      <div>
        <div className="flex justify-between items-start ">
          <div className="my-3">
            <h2 className="text-4xl font-bold">{name}</h2>
            <p className="">{specialties.join(" • ")}</p>
          </div>
        </div>

        <div className="flex">
          <div className="mt-1">
            <Image src={locationIcon} alt="map" className="w-4" />
          </div>
          <div className="ml-4">
            <div className="flex items-center font-semibold">
              <span>{practiceName}</span>
            </div>
            <div>
              <p>{address}</p>
            </div>
          </div>
        </div>
        <div className="md:flex">
          <button className="mt-4 mr-2 bg-primary hover:bg-[#2258bc] text-white py-2 px-5 rounded-full flex items-center">
            <Image
              src={phoneIcon}
              alt={"phone-icon"}
              width={27}
              className="mr-2"
            />
            {phoneNumber}
          </button>

          <button className="px-6 mt-4 py-2 text-md font-medium text-white bg-gradient-to-br from-[#7d3fce] to-[#125EEB] hover:bg-gradient-to-bl  rounded-full flex items-center">
            <Image
              src={sparkleAI}
              alt="sparkle"
              width={20}
              className="mr-1 font-semibold"
            />
            AI Consultant
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;