import { Container } from "@/components";
import { IDoctorProfile } from "@/models/doctor";
import DoctorDetail from "@/views/doctor-page/components/doctorDetail";
import DetailCard from "./components/detailCard";
import Overview from "./components/overview";

interface IDoctorProfileProps {
  doctorProfile: IDoctorProfile;
}
const DoctorProfile = ({ doctorProfile }: IDoctorProfileProps) => {
  return (
    <div className="py-6 px-3">
      <Container>
        <div className="flex flex-col gap-4">
          <DoctorDetail
            name={doctorProfile.basicDetail.firstName + " " + doctorProfile.basicDetail.lastName}
            specialties={doctorProfile.specialties}
            address={doctorProfile.basicDetail.address}
            phoneNumber={doctorProfile.basicDetail.phoneNumber}
            image={doctorProfile.basicDetail.image}
          />
          <Overview overview={doctorProfile.basicDetail.overview} />
          <DetailCard
            heading="Conditions Treated"
            items={doctorProfile.conditionsTreated}
          />
          <DetailCard
            heading="Procedures Performed"
            items={doctorProfile.proceduresPerformed}
          />
          <DetailCard
            heading="Insurance Accepted"
            items={doctorProfile.insuranceAccepted}
          />
        </div>
      </Container>
    </div>
  );
};

export default DoctorProfile;
