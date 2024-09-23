export interface IGoogleDriveAttachment {
  documentId: string;
  type: "drive";
  name: string;
  url: string;
  description: string;
  dateTime?: string;
  author?: string;
}

export interface IYoutubeVideoAttachment {
  documentId: string;
  type: "youtube";
  name: string;
  url: string;
  description: string;
  dateTime?: string;
}

export interface IBookAttachment {
  documentId: string;
  type: "book";
  name: string;
  url: string;
  description: string;
  dateTime?: string;
  author?: string;
}

export type IAttachment =
  | IGoogleDriveAttachment
  | IYoutubeVideoAttachment
  | IBookAttachment;

export interface IChatMessage {
  id: string | number;
  message: string;
  sender: "user" | "agent";
  attachments?: IAttachment[];
}

export interface IConversation {
  id: string;
  user: number;
  initialQuery: string;
  createdAt: Date;
}
