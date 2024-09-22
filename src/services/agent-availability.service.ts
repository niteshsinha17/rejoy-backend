import { apiObject, baseQuery } from "@/middlewares";
import { IGetAccountDetailsResponse, IGoogleAccountDetails } from "@/models/agent";
import {
  IAgentAvailabilitySetting,
  IUpdateAgentAvailabilitySettingServicePayload,
} from "@/models/agent-availability";
import { agentAvailabilityTransformer } from "@/transformer";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const agentAvailabilityApi = createApi({
  reducerPath: "agentAvailabilityApi",
  baseQuery: baseQuery,
  tagTypes: ["AgentAvailabilitySetting", "AgentAvailabilitySlot"],
  endpoints: (builder) => ({
    agentAvailabilitySetting: builder.query<IAgentAvailabilitySetting, string>({
      query: (agentId) => apiObject(`agent/${agentId}/availability-setting/`),
      transformResponse: agentAvailabilityTransformer.settingsResToJsFormat,
      providesTags: (result, error, id) => [
        { type: "AgentAvailabilitySetting", id },
      ],
    }),
    updateAgentAvailabilitySetting: builder.mutation<
      IAgentAvailabilitySetting,
      IUpdateAgentAvailabilitySettingServicePayload
    >({
      query: ({ agent_id, ...payload }) =>
        apiObject(`agent/${agent_id}/availability-setting/update/`).post(
          payload
        ),
      invalidatesTags: (result, error, { agent_id }) => [
        { type: "AgentAvailabilitySetting", id: agent_id },
      ],
    }),
    agentGoogleAccountDetails: builder.query<
      IGoogleAccountDetails | null,
      string
    >({
      query: (agentId) => apiObject(`agent/${agentId}/google-account-details/`),
      transformResponse: (res: IGetAccountDetailsResponse) => res.details,
    }),
  }),
});

export const {
  useAgentAvailabilitySettingQuery,
  useUpdateAgentAvailabilitySettingMutation,
  useAgentGoogleAccountDetailsQuery,
} = agentAvailabilityApi;
