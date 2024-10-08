import { apiObject, baseQuery } from "@/middlewares";
import {
  IAcceptInviteServicePayload,
  IAgentAddMemoryServicePayload,
  IAgentCreateServicePayload,
  IAgentDeleteMemoryServicePayload,
  IAgentDetail,
  IAgentDetailResponse,
  IAgentDisableResponseServicePayload,
  IAgentIntakePersonListItemResponse,
  IAgentInviteListItem,
  IAgentInviteListItemResponse,
  IAgentListItem,
  IAgentMemoryListItemResponse,
  IAgentPersonInviteDetailResponse,
  IAgentPersonInviteServicePayload,
  IAgentPublicDetail,
  IAgentUpdateGoogleLoginServicePayload,
  IRemoveIntakePersonServicePayload,
  IRemoveInvitePersonServicePayload,
  IScheduleAppointment,
} from "@/models/agent";
import { IAgentChatMessageResponse, IAgentSendMessageServicePayload } from "@/models/chat";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { agentTransformer } from "../transformer/agent.transformer";

export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery: baseQuery,
  tagTypes: ["AgentList", "AgentDetail", "AgentMemoryList", "inviteeList", "AgentIntakePersonList"],
  endpoints: (builder) => ({
    createAgent: builder.mutation<IAgentListItem, IAgentCreateServicePayload>({
      query: (payload) => apiObject("agent/create/").post(payload),
      invalidatesTags: ["AgentList"],
    }),
    agentList: builder.query<IAgentListItem[], void>({
      query: () => apiObject("agent/list/").get(),
      transformResponse: agentTransformer.agentListResToJsFormat,
      providesTags: ["AgentList"],
    }),
    agentDetail: builder.query<IAgentDetail, string>({
      query: (id) => apiObject(`agent/${id}/detail/`).get(),
      transformResponse: agentTransformer.agentDetailResToJsFormat,
      providesTags: (result, error, id) => [{ type: "AgentDetail", id }],
    }),
    agentPublicDetail: builder.query<IAgentPublicDetail, string>({
      query: (id) => apiObject(`agent/${id}/public-detail/`),
      transformResponse: agentTransformer.agentPublicDetailResToJsFormat,
    }),
    updateAgentDetail: builder.mutation<IAgentDetail, IAgentDetailResponse>({
      query: (agentData) =>
        apiObject(`agent/${agentData.id}/update/`).post(agentData).otherConfig({
          timeout: 0,
        }),
      transformResponse: agentTransformer.agentDetailResToJsFormat,
      onQueryStarted(payload, api) {
        const { dispatch, queryFulfilled } = api;
        queryFulfilled.then((res) => {
          const data = res.data;
          dispatch(
            agentApi.util.updateQueryData("agentList", undefined, (draft) => {
              if (draft) {
                const agentIndex = draft.findIndex((agent) => agent.id === data.id);
                if (agentIndex > -1) {
                  draft[agentIndex].name = data.name;
                  draft[agentIndex].isActive = data.isActive;
                }
              }
            })
          );
          dispatch(
            agentApi.util.invalidateTags([
              {
                type: "AgentDetail",
                id: data.id,
              },
            ])
          );
        });
      },
    }),
    sendMessage: builder.mutation<IAgentChatMessageResponse, IAgentSendMessageServicePayload>({
      query: ({ message, token, agentId }) =>
        apiObject(`agent/${agentId}/inbox/send-message/`)
          .post({ message })
          .token(token || ""),
    }),
    addAgentMemory: builder.mutation<any, IAgentAddMemoryServicePayload>({
      query: ({ type, url, agentId }) => apiObject(`agent/${agentId}/memory/add/`).post({ type, url }),
      invalidatesTags: (result, error, { agentId }) => [{ type: "AgentMemoryList", id: agentId }],
    }),
    deleteAgentMemory: builder.mutation<void, IAgentDeleteMemoryServicePayload>({
      query: ({ agentId, memoryId }) => apiObject(`agent/${agentId}/memory/${memoryId}/delete/`).delete(),
      invalidatesTags: (result, error, { agentId }) => [{ type: "AgentMemoryList", id: agentId }],
    }),
    agentMemoryList: builder.query<IAgentMemoryListItemResponse[], string>({
      query: (agentId) => apiObject(`agent/${agentId}/memory/list/`).get(),
      providesTags: (result, error, id) => [{ type: "AgentMemoryList", id }],
    }),
    scheduledAppointments: builder.query<IScheduleAppointment[], void>({
      query: () => apiObject(`agent/scheduled-appointments/`),
      transformResponse: agentTransformer.scheduledAppointmentListJsToResFormat,
    }),
    updateAgentGoogleAccount: builder.mutation<undefined, IAgentUpdateGoogleLoginServicePayload>({
      query: ({ agentId, ...payload }) => apiObject(`agent/${agentId}/google-account/update/`).post(payload),
    }),
    invitePerson: builder.mutation<undefined, IAgentPersonInviteServicePayload>({
      query: ({ agentId, ...payload }) => apiObject(`agent/${agentId}/invite-person/`).post(payload),
      invalidatesTags: (result, error, { agentId }) => [{ type: "inviteeList", id: agentId }],
    }),
    inviteDetail: builder.query<IAgentPersonInviteDetailResponse, string>({
      query: (token) => apiObject(`agent/invite/${token}/details/`),
    }),
    acceptInvite: builder.mutation<undefined, IAcceptInviteServicePayload>({
      query: ({ token, ...payload }) => apiObject(`agent/invite/${token}/accept/`).post(payload),
    }),
    inviteeList: builder.query<IAgentInviteListItem[], string>({
      query: (agentId) => apiObject(`agent/${agentId}/invitee/list/`),
      transformResponse: (response: IAgentInviteListItemResponse[]): IAgentInviteListItem[] =>
        response.map((item) => ({
          personEmail: item.person_email,
          id: item.id,
        })),
      providesTags: (result, error, id) => [{ type: "inviteeList", id }],
    }),
    agentIntakePersonList: builder.query<IAgentIntakePersonListItemResponse[], string>({
      query: (agentId) => apiObject(`agent/${agentId}/intake-person/list/`),
      providesTags: (result, error, id) => [{ type: "AgentIntakePersonList", id }],
    }),
    removeInvitePerson: builder.mutation<undefined, IRemoveInvitePersonServicePayload>({
      query: ({ inviteId, agentId }) => apiObject(`agent/${agentId}/invite-person/${inviteId}/delete/`).delete(),
      invalidatesTags: (result, error, { agentId }) => [{ type: "inviteeList", id: agentId }],
    }),
    removeIntakePerson: builder.mutation<undefined, IRemoveIntakePersonServicePayload>({
      query: ({ intakePersonId, agentId }) => apiObject(`agent/${agentId}/intake-person/${intakePersonId}/delete/`).delete(),
      invalidatesTags: (result, error, { agentId }) => [{ type: "AgentIntakePersonList", id: agentId }],
    }),
    disabledResponse: builder.mutation<undefined, IAgentDisableResponseServicePayload>({
      query: ({ agentId, data }) => apiObject(`agent/${agentId}/disable-response/`).post(data),
      onQueryStarted(payload, api) {
        const { dispatch, queryFulfilled } = api;
        queryFulfilled.then(() => {
          dispatch(
            agentApi.util.invalidateTags([
              {
                type: "AgentDetail",
                id: payload.agentId,
              },
            ])
          );
        });
      },
    }),
  }),
});

export const {
  useCreateAgentMutation,
  useAgentListQuery,
  useAgentDetailQuery,
  useUpdateAgentGoogleAccountMutation,
  useUpdateAgentDetailMutation,
  useSendMessageMutation,
  useAddAgentMemoryMutation,
  useAgentMemoryListQuery,
  useScheduledAppointmentsQuery,
  useInvitePersonMutation,
  useInviteDetailQuery,
  useAcceptInviteMutation,
  useInviteeListQuery,
  useAgentIntakePersonListQuery,
  useDeleteAgentMemoryMutation,
  useAgentPublicDetailQuery,
} = agentApi;
