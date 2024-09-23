import {
  IBookAttachment,
  IChatMessage,
  IChatState,
  IGoogleDriveAttachment,
  IYoutubeVideoAttachment,
} from "@/models/chat";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

const initialState: IChatState = {
  initialized: false,
  isChatMenuOpen: false,
  selectedAttachment: null,
  conversationMessages: {
    new: [],
  },
  autoPlay: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initialize(state) {
      state.initialized = true;
    },
    setSelectedAttachment(
      state,
      action: {
        payload:
          | IGoogleDriveAttachment
          | IYoutubeVideoAttachment
          | IBookAttachment
          | null;
      }
    ) {
      state.selectedAttachment = action.payload;
    },
    toggleChatMenu(state) {
      state.isChatMenuOpen = !state.isChatMenuOpen;
    },
    closeChatMenu(state) {
      state.isChatMenuOpen = false;
    },
    addMessage(
      state,
      action: {
        payload: {
          message: IChatMessage;
          conversationId: string;
        };
      }
    ) {
      const { message, conversationId } = action.payload;
      if (!state.conversationMessages[conversationId]) {
        state.conversationMessages[conversationId] = [];
      }
      state.conversationMessages[conversationId].push(message);
    },
    clearMessages(state, action: { payload: string }) {
      state.conversationMessages[action.payload] = [];
    },
    handleAgentResponse(
      state,
      action: {
        payload: {
          fakeUserMessageId: string;
          userMessage: IChatMessage;
          agentResponse: IChatMessage;
          conversationId: string;
        };
      }
    ) {
      if (!state.conversationMessages[action.payload.conversationId]) {
        state.conversationMessages[action.payload.conversationId] = [];
      }
      // update the user message
      const { fakeUserMessageId, agentResponse, conversationId } =
        action.payload;
      // find the fake user message and update it with the userMessage
      const fakeUserMessage = state.conversationMessages[conversationId].find(
        (msg) => msg.id === fakeUserMessageId
      );
      if (fakeUserMessage) {
        fakeUserMessage.id = agentResponse.id;
      } else {
        state.conversationMessages[conversationId].push(
          action.payload.userMessage
        );
      }
      // add the agent response
      state.conversationMessages[conversationId].push(agentResponse);
    },
    prependMessages(
      state,
      action: {
        payload: {
          messages: IChatMessage[];
          conversationId: string;
        };
      }
    ) {
      const { messages, conversationId } = action.payload;
      if (!state.conversationMessages[conversationId]) {
        state.conversationMessages[conversationId] = [];
      }
      state.conversationMessages[conversationId] = [
        ...messages,
        ...state.conversationMessages[conversationId],
      ];
    },
    toggleAutoPlay(state) {
      state.autoPlay = !state.autoPlay;
    },
  },
});

const selectConversationMessages = (state: RootState) =>
  state.chat.conversationMessages;

export const selectMessagesByConversationId = (conversationId: string) =>
  createSelector(
    [selectConversationMessages],
    (conversationMessages) => conversationMessages[conversationId] || []
  );

export const chatSelectors = {
  selectMessagesByConversationId,
};

export const chatActions = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
