import { apiObject, baseQuery } from "@/middlewares";
import { IThreadListItem } from "@/models/ask";
import { IChatMessage } from "@/models/chat";
import { IPaginatedResponse } from "@/models/common";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const rejoyAiApi = createApi({
  baseQuery: baseQuery,
  tagTypes: ["QuickThreadList"],
  endpoints: (builder) => ({
    initializeConversation: builder.mutation<
      {
        thread_slug: string;
        response: IChatMessage;
      },
      {
        message: string;
      }
    >({
      query: ({ message }) =>
        apiObject(`rejoy-ai/initialize-thread/`).post({
          input: message,
        }),
      invalidatesTags: ["QuickThreadList"],
    }),
    threadList: builder.query<IPaginatedResponse<IThreadListItem>, { limit: number; offset: number }>({
      query: ({ limit, offset }) => apiObject(`rejoy-ai/thread/list/`).params({ limit, offset }),
    }),
    quickThreadList: builder.query<IPaginatedResponse<IThreadListItem>, void>({
      query: () => apiObject(`rejoy-ai/thread/list/`).params({ limit: 8, offset: 0 }),
      providesTags: ["QuickThreadList"],
    }),
    threadMessages: builder.query<
      {
        results: IChatMessage[];
        next: { start: string; end: string };
      },
      { threadSlug: string; start_cursor?: string; end_cursor?: string }
    >({
      query: ({ threadSlug, start_cursor, end_cursor }) =>
        apiObject(`rejoy-ai/thread/${threadSlug}/messages/`).params({ start_cursor, end_cursor }),
    }),
    addThreadMessage: builder.mutation<IChatMessage, { threadSlug: string; message: string }>({
      query: ({ threadSlug, message }) =>
        apiObject(`rejoy-ai/thread/${threadSlug}/messages/add`).post({
          input: message,
        }),
    }),
  }),
});
