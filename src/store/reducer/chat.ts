import { IChatMessage, IChatState } from "@/models/chat";
import { localStorageTransaction } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import * as yup from "yup";

const initialState: IChatState = {
  initialized: false,
  conversationMessages: [],
};

const chatMessageSchema = yup.object().shape({
  id: yup.string().required(),
  message: yup.string().required(),
  sender: yup.mixed().oneOf(["user", "agent"]).required(),
});

const messagesListSchema = yup.array().of(chatMessageSchema);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initialize: (state) => {
      state.initialized = true;
      const messages = localStorageTransaction.getItem("conversationMessages") ?? "";
      try {
        const parsedMessages = JSON.parse(messages);
        if (messagesListSchema.isValidSync(parsedMessages)) {
          state.conversationMessages = parsedMessages as IChatMessage[];
        }
      } catch (_) {
        localStorageTransaction.removeItem("conversationMessages");
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
      localStorageTransaction.setItem("conversationMessages", JSON.stringify(state.conversationMessages));
    },
    clearMessages(state) {
      state.conversationMessages = [];
      localStorageTransaction.removeItem("conversationMessages");
    },
  },
});

export const chatActions = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
