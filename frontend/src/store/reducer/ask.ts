import { IAskState } from "@/models/ask";
import { IChatMessage } from "@/models/chat";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import * as yup from "yup";
import { IStore } from "..";

const initialState: IAskState = {
  messages: {},
  newThreadMessages: [],
};

const chatMessageSchema = yup.object().shape({
  id: yup.string().required(),
  message: yup.string().required(),
  sender: yup.mixed().oneOf(["user", "agent"]).required(),
});

const messagesListSchema = yup.array().of(chatMessageSchema);

const ask = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initiateNewThread(state, action: PayloadAction<IChatMessage[]>) {
      state.newThreadMessages = action.payload;
    },
    addPaginatedMessages(
      state,
      action: PayloadAction<{ messages: IChatMessage[]; threadSlug: string; next: { start: string | null; end: string | null } }>
    ) {
      const { messages, threadSlug: threadSlug, next } = action.payload;
      if (!state.messages[threadSlug]) {
        state.messages[threadSlug] = {
          messages: messages,
          next: next,
        };
      } else {
        const current = state.messages[threadSlug].next;
        if (current.start && current.end) {
          // paginated messages
        } else {
          // non-paginated messages
          state.messages[threadSlug].messages.push(...messages);
        }
      }
    },
    clearNewThreadMessages(state) {
      state.newThreadMessages = [];
    },
    updateNewThreadMessages(state, action: PayloadAction<IChatMessage>) {
      state.newThreadMessages = state.newThreadMessages.map((msg) => {
        if (msg.id === action.payload.id) {
          return action.payload;
        }
        return msg;
      });
    },
    updateMessage(state, action: PayloadAction<{ threadSlug: string; message: IChatMessage; id: string }>) {
      if (state.messages[action.payload.threadSlug]) {
        state.messages[action.payload.threadSlug].messages = state.messages[action.payload.threadSlug].messages.map((msg) => {
          if (msg.id === action.payload.id) {
            return action.payload.message;
          }
          return msg;
        });
      }
    },
    appendMessages(state, action: PayloadAction<{ threadSlug: string; messages: IChatMessage[] }>) {
      if (!state.messages[action.payload.threadSlug]) {
        state.messages[action.payload.threadSlug] = {
          messages: [],
          next: {
            start: null,
            end: null,
          },
        };
      }
      state.messages[action.payload.threadSlug].messages.push(...action.payload.messages);
    },
  },
});

const selectConversationMessages = (state: IStore) => state.ask.messages;

export const selectMessagesByConversationId = (conversationId: string) =>
  createSelector([selectConversationMessages], (conversationMessages) => conversationMessages[conversationId]?.messages || []);

export const askSelectors = {
  selectMessagesByConversationId,
};

export const askActions = ask.actions;
export const askReducer = ask.reducer;
