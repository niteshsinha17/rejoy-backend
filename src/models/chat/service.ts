export interface IAgentChatMessageResponse {
  id: string;
  text: string;
  is_agent_response: boolean;
  source: string;
  created_at: string;
}

export interface IAgentSendMessageServicePayload {
  message: string;
  agentId: string;
  token: string | null; // for guest user
}

export interface IAgentConversationListItemResponse {
  id: string;
  username: string;
  last_message: string;
  last_message_time: string;
  appointment_schedule_at: string;
  email: string;
  phone_number: string;
  existing_user: boolean;
  auto_replay_disabled: boolean;
}

export interface IAgentChatInboxMessagesPayload {
  limit: number;
  offset: number;
  inboxId: string;
}

export interface IAgentChatAddMessagesPayload {
  message: string;
  inboxId: string;
}

export interface ISendToNumberPayload {
  agentId: string;
  payload: {
    message: string;
    phone_number: string;
  };
}

export interface IAgentChatInboxChangeAutoReplyPayload {
  inboxId: string;
  payload: {
    auto_replay_disabled: boolean;
  };
}

export interface ISendToMessageResponse {
  inbox_id: string;
}
