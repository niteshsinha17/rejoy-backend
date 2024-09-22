import { apiObject, baseApiQuery, baseQuery } from "@/middlewares";
import { ICreateGuestUserServicePayload, ILoginServiceErrorResponse, ILoginServiceResponse } from "@/models";
import {
  IActivateUserServicePayload,
  ICreatedUserServicePayload,
  IResetPasswordServicePayload,
  ISendPhoneVerificationOtpServicePayload,
  IVerifyPhoneVerificationOtpServicePayload,
} from "@/models/auth";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const authenticateTokenService = () => baseApiQuery<ILoginServiceResponse>(apiObject("auth/check-auth/").doNotRedirect());

export const loginWithCredentialsService = (username: string, password: string) =>
  baseApiQuery<ILoginServiceResponse, ILoginServiceErrorResponse>(apiObject("auth/login/").post({ username, password }));

export const createUser = (username: string, password: string) =>
  baseApiQuery<ILoginServiceResponse>(apiObject("auth/create-user/").post({ username, password }));

export const isUsernameAvailableService = (username: string) => baseApiQuery(apiObject("auth/is-username-available/").post({ username }));

export const authApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "authApi",
  endpoints: (builder) => ({
    createGuestUser: builder.mutation<ILoginServiceResponse, ICreateGuestUserServicePayload>({
      query: (payload) => apiObject("auth/create-guest-user/").post(payload),
    }),
    createUser: builder.mutation<undefined, ICreatedUserServicePayload>({
      query: (payload) => apiObject("auth/create-user/").post(payload),
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

export const { useCreateGuestUserMutation, useSendPhoneVerificationOtpMutation, useVerifyPhoneOtpMutation } = authApi;
