export interface IDoctorProfileResponse {
  basic_detail: {
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    overview: string;
    image: string;
  };

  specialties: string[];
  conditions_treated: string[];
  procedures_performed: string[];
  insurance_accepted: string[];
}

export type IUpdateDoctorProfilePayload = IDoctorProfileResponse;
