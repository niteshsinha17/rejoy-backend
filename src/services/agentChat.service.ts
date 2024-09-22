import { apiObject, baseApiQuery, baseQuery } from "@/middlewares";
import {
  IAgentChatAddMessagesPayload,
  IAgentChatInboxChangeAutoReplyPayload,
  IAgentChatInboxMessagesPayload,
  IAgentChatMessageResponse,
  IAgentConversationListItem,
  IAgentConversationListItemResponse,
  ISendToMessageResponse,
  ISendToNumberPayload,
} from "@/models/chat";
import { IPaginatedResponse } from "@/models/common-service.interface";
import { agentTransformer } from "@/transformer";
import { localStorageTransaction } from "@/utils";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const getAgentChatMessagesService = (agentId: string, guestUser: boolean, offset: number, limit: number) => {
  let apiObj = apiObject(`agent/${agentId}/inbox/messages/`);
  if (guestUser) {
    apiObj = apiObj.token(localStorageTransaction.getItem("guestUserToken") || "");
  }
  return baseApiQuery<IPaginatedResponse<IAgentChatMessageResponse>>(apiObj.params({ offset, limit }).doNotRedirect());
};

export const getAgentConversationsService = (agentId: string, limit: number, offset: number) => {
  const apiObj = apiObject(`agent/${agentId}/conversation/list/`);
  return baseApiQuery<IPaginatedResponse<IAgentConversationListItemResponse>>(apiObj.params({ offset, limit }));
};

export const agentChatApi = createApi({
  reducerPath: "agentChatApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    inboxMessages: builder.query<IPaginatedResponse<IAgentChatMessageResponse>, IAgentChatInboxMessagesPayload>({
      query: (payload) =>
        apiObject(`agent/inbox/${payload.inboxId}/messages/`).params({
          offset: payload.offset,
          limit: payload.limit,
        }),
    }),
    addMessage: builder.mutation<IAgentChatMessageResponse, IAgentChatAddMessagesPayload>({
      query: ({ inboxId, ...payload }) => apiObject(`agent/${inboxId}/inbox/add-message/`).post(payload),
    }),
    inboxChangeAutoReply: builder.mutation<IAgentConversationListItem, IAgentChatInboxChangeAutoReplyPayload>({
      query: ({ inboxId, payload }) => apiObject(`agent/inbox/${inboxId}/change-auto-reply/`).post(payload),
      transformResponse: agentTransformer.agentConversationListItemResToJsFormat,
    }),
    sendMessageToNumber: builder.mutation<ISendToMessageResponse, ISendToNumberPayload>({
      query: ({ agentId, payload }) => apiObject(`agent/${agentId}/send-to-number/`).post(payload),
    }),
  }),
});

export const { useLazyInboxMessagesQuery, useAddMessageMutation, useSendMessageToNumberMutation } = agentChatApi;
