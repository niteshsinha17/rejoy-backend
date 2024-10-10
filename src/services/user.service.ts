import { apiObject, baseQuery } from "@/middlewares";
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
  }),
});
