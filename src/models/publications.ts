export interface IPublication {
  title: string;
  authors?: string;
  date?: string;
  publisher?: string;
  description: string;
  tags: string[];
  image: string;
  videoUrl?: string;
  type: "book" | "article_and_book_chapters" | "interview";
  longDescription?: string;
  purchaseUrl?: string;
}
