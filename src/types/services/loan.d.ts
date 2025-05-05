export interface Loan {
  expectedReturnDate: string;
  actualReturnDate?: string;
  status: string;
  borrower: string;
  title: string;
  image?: string;
  imageUrl?: string;
  id: string;
}
