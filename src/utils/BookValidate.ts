import { BookValidationErrors } from "../types/components/BookErrors";
import { Book } from "../types/services/book";

export const getBookValidationErrors = (
  book: Partial<Book>
): BookValidationErrors => {
  const errors: BookValidationErrors = {};

  if (
    !book.title ||
    typeof book.title !== "string" ||
    book.title.length < 1 ||
    book.title.length > 60
  ) {
    errors.title = "Title must be between 1 and 60 characters.";
  }

  if (
    !book.author ||
    typeof book.author !== "string" ||
    book.author.length < 1 ||
    book.author.length > 60
  ) {
    errors.author = "Author must be between 1 and 60 characters.";
  }

  if (
    !book.isbn ||
    typeof book.isbn !== "string" ||
    book.isbn.length < 10 ||
    book.isbn.length > 15
  ) {
    errors.isbn = "ISBN must be between 10 and 15 characters.";
  }

  if (
    !book.description ||
    typeof book.description !== "string" ||
    book.description.length < 1 ||
    book.description.length > 5000
  ) {
    errors.description = "Description must be between 1 and 5000 characters.";
  }

  if (
    !book.category ||
    !Array.isArray(book.category) ||
    book.category.length === 0
  ) {
    errors.category = "At least one category is required.";
  } else if (
    book.category.some(
      (c) => typeof c !== "string" || c.length < 1 || c.length > 30
    )
  ) {
    errors.category = "Each category must be between 1 and 30 characters.";
  }

  if (
    book.quantityAvailable == null ||
    typeof book.quantityAvailable !== "number"
  ) {
    errors.quantityAvailable = "Quantity must be a number.";
  }

  if (
    book.linkPdf &&
    (typeof book.linkPdf !== "string" ||
      book.linkPdf.length < 10 ||
      book.linkPdf.length > 150)
  ) {
    errors.linkPdf = "Link must be between 10 and 150 characters.";
  }

  if (book.image && typeof book.image !== "string") {
    errors.image = "Image must be a string.";
  }

  return errors;
};
