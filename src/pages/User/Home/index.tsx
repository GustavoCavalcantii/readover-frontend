import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/User";
import * as Style from "./styles";
import { BookContainer } from "../../../components/BookContainer";
import { Sidebar } from "../../../components/Sidebar";
import { BookService } from "../../../services/Book/BookService";
import { Book } from "../../../types/services/book";
import { getImageUrl } from "../../../services/Images/FileUtils";

const BookListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [books, setBooks] = useState<Book[]>([]);
  const [genders, setGenders] = useState<string[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [selInput, setSelInput] = useState<string>("");

  const [search, setSearch] = useState("");
  const [selGenders, setSelGenders] = useState<string>("");

  const toggleGender = (gender: string) => {
    setSelInput((prev) => (prev === gender ? "" : gender));
  };

  const handleSearch = async () => {
    setSearch(searchInput);
    const selected = selInput ? selInput : "";
    setSelGenders(selected);

    const params = new URLSearchParams();
    if (searchInput) params.set("search", searchInput);
    if (selInput) params.set("category", selInput);
    setSearchParams(params);

    const booksOb = await BookService.getByFilter(selected, searchInput);

    const booksWithImages = await Promise.all(
      booksOb.map(async (book) => {
        const imageUrl = await getImageUrl(book.image ?? "", "livro");
        return { ...book, imageUrl };
      })
    );

    setBooks(booksWithImages);
  };

  useEffect(() => {
    const fetchGenders = async () => {
      const gendersOb = await BookService.getAllCategories();
      if (gendersOb) setGenders(gendersOb);
    };
    fetchGenders();
  }, []);

  useEffect(() => {
    const initialSearch = searchParams.get("search") || "";
    const initialCategory = searchParams.get("category") || "";

    setSearchInput(initialSearch);
    setSelInput(initialCategory);
    setSearch(initialSearch);
    setSelGenders(initialCategory ? initialCategory : "");

    const fetchBooks = async () => {
      const booksOb = await BookService.getByFilter(
        initialCategory ? [initialCategory] : [],
        initialSearch
      );

      const booksWithImages = await Promise.all(
        booksOb.map(async (book) => {
          const imageUrl = await getImageUrl(book.image ?? "", "livro");
          return { ...book, imageUrl };
        })
      );

      setBooks(booksWithImages);
    };

    fetchBooks();
  }, []); 

  useEffect(() => {
    document.title = "Home | Readover";
  }, []);

  const BooksList = ({ books }: { books: Book[] }) => {
    return (
      <>
        {books.map((book, index) => (
          <BookContainer
            key={index}
            title={book.title}
            author={book.author}
            isAvailable={(book.quantityAvailable - book.quantityLoaned) > 0}
            genders={book.category}
            image={book.imageUrl}
            onClick={() => navigate(`/user/book/${book.id}`)}
          />
        ))}
      </>
    );
  };

  return (
    <main style={{ height: "100%"}}>
      <Navbar
        isSearch
        onClick={handleSearch}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
      <Style.AppContainer>
        <Sidebar
          allGenders={genders}
          selectedGenders={selInput ? [selInput] : []}
          onToggleGender={toggleGender}
        />

        <Style.SearchItemsContainer>
          <div style={{ marginBottom: "1rem" }}>
            Results for: <strong>{search || "All Books"}</strong> with status:{" "}
            <strong>{selGenders || "Any"}</strong>
          </div>

          <Style.Container>
            <Style.BooksList>
              {books?.length > 0 ? (
                <BooksList books={books} />
              ) : (
                <div>No books found</div>
              )}
            </Style.BooksList>
          </Style.Container>
        </Style.SearchItemsContainer>
      </Style.AppContainer>
    </main>
  );
};

export default BookListPage;
