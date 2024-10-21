"use client";
import { userApi } from "@/services/user.service";
import BasicDetail from "./components/basic-detail";
import Loader from "./components/loader";
import ProfessionalDetails from "./components/professional-details";

const DoctorDashboard = () => {
  const { data: doctorDetail } = userApi.useDoctorProfileQuery();
  const [updateProfile] = userApi.useUpdateDoctorProfileMutation();
  if (!doctorDetail) return <Loader />;

  return (
    <div className="space-y-4">
      <BasicDetail
        basicDetail={doctorDetail.basicDetail}
        save={(basicDetail) => {
          return updateProfile({
            ...doctorDetail,
            basicDetail,
          }).unwrap();
        }}
      />
      <ProfessionalDetails
        specialties={doctorDetail.specialties}
        proceduresPerformed={doctorDetail.proceduresPerformed}
        conditionsTreated={doctorDetail.conditionsTreated}
        insuranceAccepted={doctorDetail.insuranceAccepted}
        save={(professionalDetails) => {
          return updateProfile({
            ...doctorDetail,
            ...professionalDetails,
          }).unwrap();
        }}
      />
    </div>
  );
};

export default DoctorDashboard;
