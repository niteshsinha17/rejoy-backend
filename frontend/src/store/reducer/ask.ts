import { IChatMessage, IChatState } from "@/models/chat";
import { localStorageTransaction } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import * as yup from "yup";

const initialState: IChatState = {
  initialized: false,
  conversationMessages: [],
  hasHistory: false,
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
    initialize: (state) => {
      state.initialized = true;
      const messages = localStorageTransaction.getItem("askMessages") ?? "";
      try {
        const parsedMessages = JSON.parse(messages) as IChatMessage[];
        if (messagesListSchema.isValidSync(parsedMessages)) {
          state.conversationMessages = parsedMessages;
          if (parsedMessages.length > 0) {
            state.hasHistory = true;
          }
        }
      } catch (_) {
        localStorageTransaction.removeItem("askMessages");
      }
    },

    addMessage(
      state,
      action: {
        payload: {
          message: IChatMessage;
        };
      }
    ) {
      state.conversationMessages.push(action.payload.message);
      localStorageTransaction.setItem("askMessages", JSON.stringify(state.conversationMessages));
    },
    clearMessages(state) {
      state.conversationMessages = [];
      localStorageTransaction.removeItem("askMessages");
      state.hasHistory = false;
    },
  },
});

export const askActions = ask.actions;
export const askReducer = ask.reducer;
