import { ApiService } from "../../services/ApiService";
import { Loan } from "../../types/services/loan";
import { BookService } from "../Book/BookService";

const loanUrl = "/emprestimo";

const handleApiError = (error: any): void => {
  console.error("Erro na requisição da api", error);
};

export const LoanService = {
  async getAll(): Promise<Loan[] | undefined> {
    try {
      const response = await ApiService.get(loanUrl);

      const loans: Loan[] = await Promise.all(
        response.data.data.map(async (loan: any) => {
          const book = await BookService.getById(loan.book.id);
          return {
            id: loan.id,
            expectedReturnDate: loan.expectedReturnDate,
            actualReturnDate: loan.actualReturnDate,
            image: book?.image,
            title: loan.book.title,
            borrower: loan.user.username,
            status: loan.status,
          };
        })
      );

      if (response.status !== 200) return undefined;

      return loans;
    } catch (error) {
      handleApiError(error);
      return undefined;
    }
  },

  async getMyLoans(): Promise<Loan[] | undefined> {
    try {
      const response = await ApiService.get(`${loanUrl}/meus-emprestimos`);

      const loans: Loan[] = await Promise.all(
        response.data.data.map(async (loan: any) => {
          const book = await BookService.getById(loan.book.id);
          return {
            id: loan.id,
            expectedReturnDate: loan.expectedReturnDate,
            actualReturnDate: loan.actualReturnDate,
            image: book?.image,
            title: loan.book.title,
            borrower: loan.user.username,
            status: loan.status,
          };
        })
      );

      return loans;
    } catch (error) {
      handleApiError(error);
      return undefined;
    }
  },

  async requestLoan(bookId: string, returnInDays: number): Promise<void> {
    try {
      const response = await ApiService.post(loanUrl, { bookId, returnInDays });
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      return undefined;
    }
  },

  async aproveLoan(loanId: string): Promise<Loan | null> {
    try {
      const response = await ApiService.put(`${loanUrl}/aprovar/${loanId}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      return null;
    }
  },

  async rejectLoan(loanId: string): Promise<Loan | null> {
    try {
      const response = await ApiService.put(`${loanUrl}/rejeitar/${loanId}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      return null;
    }
  },

  async returnedLoan(loanId: string): Promise<Loan | null> {
    try {
      const response = await ApiService.put(`${loanUrl}/retornar/${loanId}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      return null;
    }
  },

  async getLoanById(loanId: string): Promise<Loan | null> {
    try {
      const response = await ApiService.get(`${loanUrl}/id/${loanId}`);
      const loan = response.data.data;

      const book = await BookService.getById(loan.book.id);
      return {
        id: loan.id,
        expectedReturnDate: loan.expectedReturnDate,
        actualReturnDate: loan.actualReturnDate,
        image: book?.image,
        title: loan.book.title,
        borrower: loan.user.username,
        status: loan.status,
      };
    } catch (error) {
      handleApiError(error);
      return null;
    }
  },
};
