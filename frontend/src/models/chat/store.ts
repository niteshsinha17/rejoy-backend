import { IChatMessage } from "./reducer";

export interface IAgentChatMessage {
  id: string;
  message: string;
  isAgentResponse: boolean;
  source: string;
  createdAt: string;
}

export interface IChatState {
  messages: Record<string, IChatMessage[]>;
  newThreadMessages: IChatMessage[];
}
