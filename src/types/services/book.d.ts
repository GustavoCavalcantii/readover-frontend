export interface Book {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  quantityAvailable: number;
  description: string;
  category: string[];
  quantity: int;
  linkPdf?: string;
  image?: string;
  quantityLoaned: number;
  imageUrl?: string;
}  