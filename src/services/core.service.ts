import { apiObject, baseQuery } from "@/middlewares";
import { IAvailableNumberListItem, IBuyNumberServicePayload } from "@/models/core";
import { coreTransformer } from "@/transformer/core";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const coreApi = createApi({
  reducerPath: "coreApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    timezoneList: builder.query<string[], void>({
      query: () => apiObject("core/timezone/list"),
    }),
    availableNumberList: builder.query<IAvailableNumberListItem[], void>({
      query: () => apiObject("core/available-numbers/"),
      transformResponse: coreTransformer.convertAvailableNumberListResponseToJsFormat,
    }),
    buyNumber: builder.mutation<undefined, IBuyNumberServicePayload>({
      query: (payload) => apiObject("core/buy-number/").post(payload),
    }),
  }),
});

export const { useTimezoneListQuery, useAvailableNumberListQuery, useBuyNumberMutation } = coreApi;
