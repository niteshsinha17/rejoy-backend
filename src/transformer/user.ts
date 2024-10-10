import { IDoctorProfile } from "@/models/doctor";
import { IDoctorProfileResponse, IUpdateDoctorProfilePayload } from "@/models/doctor/service";
import { IUser, IUserResponse } from "@/models/user";

export const userTransformer = {
  convertUserResponseToJSFormat: (userData: IUserResponse): IUser => ({
    email: userData.email,
    firstName: userData.first_name,
    lastName: userData.last_name,
    id: userData.id,
    image: userData.image,
    fullName: userData.full_name,
    username: userData.username,
  }),
  convertDoctorProfileResponseToJSFormat: (doctorProfile: IDoctorProfileResponse): IDoctorProfile => {
    return {
      basicDetail: {
        firstName: doctorProfile.basic_detail.first_name ?? "",
        lastName: doctorProfile.basic_detail.last_name ?? "",
        phoneNumber: doctorProfile.basic_detail.phone_number ?? "",
        address: doctorProfile.basic_detail.address ?? "",
        overview: doctorProfile.basic_detail.overview ?? "",
        image: doctorProfile.basic_detail.image ?? "",
      },
      specialties: doctorProfile.specialties,
      conditionsTreated: doctorProfile.conditions_treated,
      proceduresPerformed: doctorProfile.procedures_performed,
      insuranceAccepted: doctorProfile.insurance_accepted,
    };
  },
  convertDoctorProfileToPayload: (doctorProfile: IDoctorProfile): IUpdateDoctorProfilePayload => ({
    basic_detail: {
      first_name: doctorProfile.basicDetail.firstName,
      last_name: doctorProfile.basicDetail.lastName,
      phone_number: doctorProfile.basicDetail.phoneNumber,
      address: doctorProfile.basicDetail.address,
      overview: doctorProfile.basicDetail.overview,
      image: doctorProfile.basicDetail.image,
    },
    specialties: doctorProfile.specialties,
    conditions_treated: doctorProfile.conditionsTreated,
    procedures_performed: doctorProfile.proceduresPerformed,
    insurance_accepted: doctorProfile.insuranceAccepted,
  }),
};
