import { apiObject, baseQuery } from "@/middlewares";
import {
  IActivateUserServicePayload,
  ICreatedDoctorUserServicePayload,
  ILoginServiceResponse,
  IResetPasswordServicePayload,
  ISendPhoneVerificationOtpServicePayload,
  IVerifyPhoneVerificationOtpServicePayload,
} from "@/models/auth";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "authApi",
  endpoints: (builder) => ({
    authenticateToken: builder.mutation<ILoginServiceResponse, void>({
      query: () => apiObject("auth/check-auth/").doNotRedirect(),
    }),
    createDoctorUser: builder.mutation<undefined, ICreatedDoctorUserServicePayload>({
      query: (payload) => apiObject("auth/create-doctor-user/").post(payload),
    }),
    loginWithCredentials: builder.mutation<ILoginServiceResponse, { email: string; password: string }>({
      query: (payload) => apiObject("auth/login/").post(payload),
    }),
    activateUser: builder.mutation<ILoginServiceResponse, IActivateUserServicePayload>({
      query: (payload) => apiObject("auth/activate-user/").post(payload),
    }),
    sendPhoneVerificationOtp: builder.mutation<undefined, ISendPhoneVerificationOtpServicePayload>({
      query: (payload) => apiObject("auth/send-phone-verification-otp/").post(payload),
    }),
    verifyPhoneOtp: builder.mutation<ILoginServiceResponse, IVerifyPhoneVerificationOtpServicePayload>({
      query: (payload) => apiObject("auth/verify-phone-otp/").post(payload),
    }),
    sendEmailVerificationOtp: builder.mutation<undefined, string>({
      query: (email) => apiObject("auth/send-email-verification-code/").post({ email }),
    }),
    resetPassword: builder.mutation<undefined, IResetPasswordServicePayload>({
      query: (payload) => apiObject("auth/reset-password/").post(payload),
    }),
  }),
});
