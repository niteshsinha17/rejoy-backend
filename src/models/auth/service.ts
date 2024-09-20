export interface ICreatedUserServicePayload {
  username: string;
  email: string;
  password: string;
}

export interface ICreateUserServiceErrorResponse {
  username: string[];
  email: string[];
  password: string[];
}

export interface IActivateUserServicePayload {
  username: string;
  email: string;
  otp: string;
}

export interface ISendPhoneVerificationOtpServicePayload {
  phone_number: string;
}

export interface ISendPhoneVerificationOtpErrorResponse {
  phone_number: string[];
}

export interface IVerifyPhoneVerificationOtpServicePayload {
  phone_number: string;
  otp: string;
}

export interface IResetPasswordServicePayload {
  email: string;
  otp: string;
  password: string;
}
