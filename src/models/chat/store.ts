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
