import { IChatMessage } from "../chat";

export interface IAskState {
  messages: Record<
    string,
    {
      messages: IChatMessage[];
      next: { start: string | null; end: string | null };
    }
  >;
  newThreadMessages: IChatMessage[];
}
