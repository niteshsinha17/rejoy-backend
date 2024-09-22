// logged in
export interface ILoggedInUserResponse {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  phone_number: string;
  company_logo: string;
}

export interface ILoggedInUserProfileResponse {
  profile_title: string;
  dob: string;
  phone_number: string;
  email: string;
  phone_verified: boolean;
  email_verified: boolean;
  bio: string;
  gender: string;
  avatar: string;
}

export interface IUserPublicResponse {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
}

export interface IUserPublicProfileResponse {
  profile_title: string;
  dob: string;
  bio: string;
  gender: string;
  avatar: string;
}

export interface IUpdateUserDetailServicePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  token?: string;
  company_logo?: string;
  existing_user?: boolean;
}

export interface IUpdateUserDetailErrorResponse {
  email?: string;
  phone_number?: string;
}
