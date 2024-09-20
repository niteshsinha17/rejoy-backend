export interface ILoginServiceResponse {
  token: string;
}
export interface ILoginServiceErrorResponse {
  username?: string[];
  password?: string[];
}

export interface ICreateGuestUserServicePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  existing_user: boolean;
}

export interface ICreateGuestUserServiceErrorResponse {
  email?: string[];
  phone_number?: string[];
  existing_user?: boolean;
}
