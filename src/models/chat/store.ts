import { IChatMessage } from "./reducer";

export interface IAgentChatMessage {
  id: string;
  message: string;
  isAgentResponse: boolean;
  source: string;
  createdAt: string;
}

export interface IChatState {
  initialized: boolean;
  conversationMessages: IChatMessage[];
}
