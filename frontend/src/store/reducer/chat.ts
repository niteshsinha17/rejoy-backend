import { IChatMessage, IChatState } from "@/models/chat";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as yup from "yup";

const initialState: IChatState = {
  messages: {},
  newThreadMessages: [],
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
    addNewThreadMessages(state, action: PayloadAction<IChatMessage[]>) {
      const messages = action.payload;
      state.newThreadMessages.push(...messages);
    },
    addMessage(state, action: PayloadAction<{ message: IChatMessage; threadId?: string }>) {
      const { message, threadId } = action.payload;
      const thread = threadId ? state.messages[threadId] : state.newThreadMessages;
      thread.push(message);
    },
  },
});

export const chatActions = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
