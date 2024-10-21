export interface IDoctorProfile {
  basicDetail: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    overview: string;
    image: string;
  };
  specialties: string[];
  conditionsTreated: string[];
  proceduresPerformed: string[];
  insuranceAccepted: string[];
}
