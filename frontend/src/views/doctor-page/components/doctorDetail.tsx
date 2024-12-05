"use client";
import { usePathParams } from "@/hooks";
import { MapPinOutlineIcon, PhoneOutlineIcon } from "@/icons";
import Avatar from "@/ui/avatar";
import Link from "next/link";

interface DoctorDetailProps {
  name: string;
  specialties: string[];
  address: string;
  phoneNumber: string;
  image: string;
}

const DoctorDetail = (props: DoctorDetailProps) => {
  const { username } = usePathParams();
  return (
    <div className="p-2 sm:p-4 rounded-2xl">
      <div className="sm:flex gap-4 max-sm:text-center">
        <Avatar
          image={props.image}
          name={props.name}
          size="xl"
        />

        <div className="flex-1 overflow-hidden space-y-3">
          <div className="space-y-2">
            <h1 className="font-semibold text-2xl text-black">{props.name}</h1>
            <div className="flex flex-wrap gap-2 max-sm:justify-center">
              {props.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-200 rounded-full px-2 py-1"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium text-black flex gap-1 items-center">
              <MapPinOutlineIcon />
              Address
            </div>
            <div>{props.address ?? "-"}</div>
          </div>
          <div>
            <div className="flex max-sm:flex-col gap-2">
              {props.phoneNumber && (
                <Link
                  href="tel:+1234567890"
                  className="bg-primary hover:bg-[#2258bc] gap-3 text-white py-2 px-4 rounded-full flex items-center text-sm font-semibold"
                >
                  <PhoneOutlineIcon className="icon-xs" />
                  {props.phoneNumber}
                </Link>
              )}

              {/* <Link
                href={getFilledRoutes(AppRoutes.DOCTOR_AGENT, {
                  username: username,
                })}
                className="px-4 py-2 text-md font-semibold text-white bg-gradient-to-br from-[#7d3fce] to-[#125EEB] hover:bg-gradient-to-bl rounded-full flex items-center text-sm gap-3"
              >
                <ChatOutlineIcon />
                AI Consultant
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
