import {
  apiObject,
  baseApiQuery,
  baseQuery,
  getApi,
  postApi,
} from "@/middlewares";
import {
  ILoggedInUser,
  ILoggedInUserProfile,
  ILoggedInUserProfileResponse,
  ILoggedInUserResponse,
  ILoginServiceResponse,
  IUpdateUserDetailServicePayload,
} from "@/models";
import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { userTransformer } from "../transformer";
export const getUserDataService = () =>
  baseApiQuery<ILoggedInUserResponse>(apiObject("user/data/"));

// export const getUserPublicLinkTreeProfile = () => getApi;

export const getUserProfileService = async (): Promise<
  ILoggedInUserProfile | undefined
> => {
  const res = await getApi<ILoggedInUserProfileResponse>({
    endpoint: "api/v1/user/profile",
  });

  try {
    if (res.data) {
      return {
        profileTitle: res.data.profile_title,
        dob: res.data.dob,
        avatar: res.data.avatar,
        bio: res.data.bio,
        email: res.data.email,
        emailVerified: res.data.email_verified,
        gender: res.data.gender,
        phoneNumber: res.data.phone_number,
        phoneVerified: res.data.phone_verified,
      };
    }
  } catch (err) {}
};

export const updateUserProfileService = async (data: ILoggedInUserProfile) => {
  const transformedData: ILoggedInUserProfileResponse = {
    profile_title: data.profileTitle,
    dob: data.dob,
    avatar: data.avatar,
    bio: data.bio,
    email: data.email,
    email_verified: data.emailVerified,
    gender: data.gender,
    phone_number: data.phoneNumber,
    phone_verified: data.phoneVerified,
  };
  const res = await postApi<ILoggedInUserProfileResponse>({
    endpoint: "api/v1/user/profile/update",
    data: transformedData,
  });

  try {
    if (res.data) {
      return {
        profileTitle: res.data.profile_title,
        dob: res.data.dob,
        avatar: res.data.avatar,
        bio: res.data.bio,
        email: res.data.email,
        emailVerified: res.data.email_verified,
        gender: res.data.gender,
        phoneNumber: res.data.phone_number,
        phoneVerified: res.data.phone_verified,
      };
    }
  } catch (err) {}
};

export const updateEmailService = async (email: string) => {
  const res = await postApi({
    endpoint: "api/v1/auth/update-email",
    data: {
      email,
    },
  });
  if (!res.success) {
    // @ts-ignore
    if (res.error?.response?.data?.error_message) {
      // @ts-ignore
      toast.error(res.error.response.data.error_message);
    }
  }
  return res;
};

export const verifyEmailOtpService = async (otp: string) => {
  const res = await postApi({
    endpoint: "api/v1/auth/verify-email-otp",
    data: {
      otp,
    },
  });

  if (!res.success) {
    // @ts-ignore
    if (res.error?.response?.data?.error_message) {
      // @ts-ignore
      toast.error(res.error.response.data.error_message);
    }
  }
  return res;
};

export const updatePasswordService = async (
  oldPassword: string,
  newPassword: string
) => {
  const res = await postApi<ILoginServiceResponse>({
    endpoint: "api/v1/auth/update-password",
    data: {
      old_password: oldPassword,
      new_password: newPassword,
    },
  });
  if (!res.success) {
    // @ts-ignore
    if (res.error?.response?.data?.error_message) {
      // @ts-ignore
      toast.error(res.error.response.data.error_message);
    }
  }
  return res;
};

export const resendEmailOtpService = async () => {
  const res = await postApi({
    endpoint: "api/v1/auth/resend-email-otp",
  });
  return res;
};

export const forgotPasswordService = async (username: string) => {
  const res = await postApi({
    endpoint: "api/v1/auth/forgot-password",
    data: {
      username,
    },
  });

  if (!res.success) {
    // @ts-ignore
    if (res.error?.response?.data?.error_message) {
      // @ts-ignore
      toast.error(res.error.response.data.error_message);
    }
  }
  return res;
};

export const verifyForgotPasswordOtpService = (
  otp: string,
  new_password: string,
  username: string
) => {
  const res = postApi({
    endpoint: "api/v1/auth/forgot-password/verify-otp",
    data: {
      otp,
      new_password,
      username,
    },
  });
  return res;
};

export const userApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loggedInUser: builder.query<ILoggedInUser, void>({
      query: () => apiObject("user/data/"),
      transformResponse: userTransformer.selfUserResToJsFormat,
      providesTags: ["User"],
    }),
    userTwilioPhoneNumber: builder.query<string, void>({
      query: () => apiObject("user/twilio-phone-number"),
    }),
    getUserDetails: builder.query<ILoggedInUser, string>({
      query: (token) => apiObject("user/data/").token(token).doNotRedirect(),
      transformResponse: userTransformer.selfUserResToJsFormat,
    }),
    updateUserDetail: builder.mutation<
      ILoggedInUser,
      IUpdateUserDetailServicePayload
    >({
      query: ({ token, ...data }) =>
        apiObject("user/update/")
          .put(data)
          .token(token ?? null),
      transformResponse: userTransformer.selfUserResToJsFormat,
    }),
  }),
});

export const {
  useLoggedInUserQuery,
  useUserTwilioPhoneNumberQuery,
  useLazyGetUserDetailsQuery,
  useGetUserDetailsQuery,
  useUpdateUserDetailMutation,
} = userApi;
