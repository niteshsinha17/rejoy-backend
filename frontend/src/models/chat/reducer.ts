export interface IChatMessage {
  id: string;
  input: string;
  query: string;
  sources: {
    id: string;
    title: string;
    url: string;
    description: string;
    favicon: string;
    domain: string;
  }[];
  text: ITextBlock[];
  error: boolean;
  error_message?: string;
  error_description?: string;
  pending?: boolean;
  follow_ups?: string[];
}

export interface ITextBlock {
  sources: number[];
  text: string;
  type: "text" | "list" | "table";
  list_items: string[];
  heading: string;
  table_columns: string[];
  table_rows: string[][];
}
