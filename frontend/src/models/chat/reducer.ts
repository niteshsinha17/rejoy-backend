export interface IChatMessage {
  id: string | number;
  message: string;
  sender: "user" | "agent";
}

export interface IConversation {
  id: string;
  user: number;
  initialQuery: string;
  createdAt: Date;
}
