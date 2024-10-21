import { apiObject, baseQuery } from "@/middlewares";
import { IChatMessage } from "@/models/chat";
import { IDoctorProfile } from "@/models/doctor";
import { IUser } from "@/models/user";
import { userTransformer } from "@/transformer/user";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "userApi",
  tagTypes: ["User", "DoctorProfile"],
  endpoints: (builder) => ({
    loggedInUser: builder.query<IUser, void>({
      query: () => apiObject("user/basic-detail/"),
      transformResponse: userTransformer.convertUserResponseToJSFormat,
      providesTags: ["User"],
    }),
    doctorProfile: builder.query<IDoctorProfile, void>({
      query: () => apiObject("user/doctor-profile/"),
      transformResponse: userTransformer.convertDoctorProfileResponseToJSFormat,
      providesTags: ["DoctorProfile"],
    }),
    updateDoctorProfile: builder.mutation<IDoctorProfile, IDoctorProfile>({
      query: (payload) => apiObject("user/doctor-profile/update/").put(userTransformer.convertDoctorProfileToPayload(payload)),
      invalidatesTags: ["DoctorProfile"],
    }),
    generateUserResponse: builder.mutation<
      string,
      {
        message: string;
        username: string;
        history: IChatMessage[];
      }
    >({
      query: ({ username, message, history }) =>
        apiObject(`user/${username}/generate-response/`).post({
          message,
          history,
        }),
    }),
    // TODO: Move to separate service file
    ask: builder.mutation<
      string,
      {
        message: string;
        history: IChatMessage[];
      }
    >({
      query: ({ message, history }) =>
        apiObject(`user/ask/`).post({
          message,
          history,
        }),
    }),
  }),
});
