import { apiObject, baseQuery } from "@/middlewares";
import { IUser } from "@/models/user";
import { userTransformer } from "@/transformer/user";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loggedInUser: builder.query<IUser, void>({
      query: () => apiObject("user/basic-details/"),
      transformResponse: userTransformer.convertUserResponseToJSFormat,
      providesTags: ["User"],
    }),
  }),
});
