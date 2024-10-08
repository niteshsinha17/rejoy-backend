import {
  IBookAttachment,
  IChatMessage,
  IGoogleDriveAttachment,
  IYoutubeVideoAttachment,
} from "./reducer";
export interface IAgentChatMessage {
  id: string;
  message: string;
  isAgentResponse: boolean;
  source: string;
  createdAt: string;
}

export interface IAgentConversationListItem {
  id: string;
  username: string;
  lastMessage: string;
  lastMessageTime: string;
  appointmentScheduleAt: string;
  email: string;
  phoneNumber: string;
  existingUser: boolean;
  autoReplayDisabled: boolean;
}

export interface IChatState {
  initialized: boolean;
  isChatMenuOpen: boolean;
  selectedAttachment:
    | IGoogleDriveAttachment
    | IYoutubeVideoAttachment
    | IBookAttachment
    | null;
  conversationMessages: Record<string, IChatMessage[]>;
  autoPlay: boolean;
}