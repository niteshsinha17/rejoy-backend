import { apiObject, baseQuery } from "@/middlewares";
import { IPaginatedResponse } from "@/models";
import { IChatMessage, IConversation } from "@/models/chat";
import { createApi } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAgentResponse: builder.mutation<
      {
        userMessage: IChatMessage;
        agentResponse: IChatMessage;
        conversationId: string;
      },
      { message: string; conversationId?: string; chatHistory: IChatMessage[] }
    >({
      query: (payload) => apiObject("chat/get-reply/").post(payload),
    }),
    conversationList: builder.query<
      IConversation[],
      { limit: number; offset: number }
    >({
      query: (payload) => apiObject("chat/conversation-list/").params(payload),
    }),
    messageList: builder.query<
      IPaginatedResponse<IChatMessage>,
      { conversationId: string; limit: number; cursor?: number }
    >({
      query: (payload) => apiObject("chat/message-list/").params(payload),
    }),
  }),
});

export default chatApi;
