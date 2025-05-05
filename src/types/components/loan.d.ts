export interface LoanProps {
  expectedReturnDate: string;
  borrower: string;
  status: string;
  title: string;
  onClick?: () => void;
  image?: string;
  isClickable?: boolean;
}
