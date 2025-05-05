import imageCompression from "browser-image-compression";
import { ApiService } from "../../services/ApiService";
import { Book } from "../../types/services/book";

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-z0-9.\-_]/gi, "_");
}

const bookUrl = "/livro";

const handleApiError = (error: any): void => {
  console.error("Erro na requisição da api", error.message);
};

const validateBookData = (book: Partial<Book>): boolean => {
  if (
    !book.title ||
    typeof book.title !== "string" ||
    book.title.length < 1 ||
    book.title.length > 60 ||
    !book.author ||
    typeof book.author !== "string" ||
    book.author.length < 1 ||
    book.author.length > 60 ||
    !book.isbn ||
    typeof book.isbn !== "string" ||
    book.isbn.length < 10 ||
    book.isbn.length > 15 ||
    !book.description ||
    typeof book.description !== "string" ||
    book.description.length < 1 ||
    book.description.length > 5000 ||
    !book.category ||
    !Array.isArray(book.category) ||
    book.category.length === 0 ||
    book.category.some(
      (c) => typeof c !== "string" || c.length < 1 || c.length > 30
    ) ||
    book.quantityAvailable == null ||
    typeof book.quantityAvailable !== "number"
  ) {
    throw new Error("Required fields are missing or invalid.");
  }

  if (
    book.linkPdf &&
    (typeof book.linkPdf !== "string" ||
      book.linkPdf.length < 10 ||
      book.linkPdf.length > 150)
  ) {
    throw new Error("PDF link must be 10–150 characters.");
  }

  if (book.image && typeof book.image !== "string") {
    throw new Error("Image must be a string.");
  }

  return true;
};

export const BookService = {
  async getAll(): Promise<Book[] | undefined> {
    try {
      const response = await ApiService.get(`${bookUrl}/filtrar`);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      return undefined;
    }
  },

  async getAllCategories(): Promise<string[] | undefined> {
    try {
      const response = await ApiService.get(`${bookUrl}/categorias`);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      return undefined;
    }
  },

  async getById(id: string): Promise<Book | undefined> {
    try {
      const response = await ApiService.get(`${bookUrl}/${id}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      return undefined;
    }
  },

  async getByFilter(
    genders?: string[] | string,
    search?: string
  ): Promise<Book[] | []> {
    try {
      const params: Record<string, string> = {};

      if (search) params.filter = search;

      if (Array.isArray(genders)) {
        if (genders.length > 0) params.category = genders.join(",");
      } else if (genders) {
        params.category = genders;
      }

      const response = await ApiService.get(`${bookUrl}/filtrar`, { params });
      return response.data.data;
    } catch (error: any) {
      handleApiError(error);
      return [];
    }
  },

  async create(book: Partial<Book>): Promise<Book | undefined> {
    try {
      validateBookData(book);
      const response = await ApiService.post(bookUrl, book);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  async update(id: string, book: Partial<Book>): Promise<Book | undefined> {
    try {
      validateBookData(book);
      const response = await ApiService.put(`${bookUrl}/${id}`, book);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      return undefined;
    }
  },

  uploadImage: async (id: string, file: File) => {
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const sanitizedFileName = sanitizeFileName(
        compressedFile.name || file.name
      );
      const renamedFile = new File([compressedFile], sanitizedFileName, {
        type: compressedFile.type,
      });

      const formData = new FormData();
      formData.append("image", renamedFile);

      const response = await ApiService.post(`/livro/imagem/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
