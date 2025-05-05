import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonComponent } from "../../../components/Button/index";
import { InputComponent } from "../../../components/TextInput";
import Navbar from "../../../components/Navbar/Admin/index";
import * as FaIcons from "react-icons/fa";
import * as Style from "./styles";
import { BookService } from "../../../services/Book/BookService";
import { getImageUrl } from "../../../services/Images/FileUtils";
import { removeTransparency } from "../../../utils/RemoveTransparency";
import WarnComponent from "../../../components/WarnComponent";


const EditBook: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [message, setMessage] = useState({ message: "", type: "" });

  const [showFullImage, setShowFullImage] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Change Book | Readover";
  }, []);

  useEffect(() => {
    if (!id) {
      navigate(-1);
      return;
    }

    const fetchBook = async () => {
      try {
        const book = await BookService.getById(id);

        if (!book) {
          setMessage({ message: "Livro não encontrado", type: "danger" });
          return;
        }

        setTitle(book.title || "");
        setAuthor(book.author || "");
        setIsbn(book.isbn || "");
        setQuantity(book.quantityAvailable || 1);
        setCategories(book.category || []);
        setLink(book.linkPdf || "");
        setSynopsis(book.description || "");

        if (book.image) {
          const imageUrl = await getImageUrl(book.image, "livro");
          setImagePreview(imageUrl);
        }
      } catch (error) {
        setMessage({ message: "Erro ao carregar livro: " + error, type: "danger" });
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const fileWithoutTransparency = await removeTransparency(file);
        setImageFile(fileWithoutTransparency);
        setImagePreview(URL.createObjectURL(fileWithoutTransparency));
      } catch (error) {
        setMessage({ message: "Erro ao processar imagem: " + error, type: "danger" });
      }
    }
  };


  const handleImageButton = () => {
    if (imagePreview) {
      setImagePreview(undefined);
      setImageFile(null);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = async () => {

    const bookToUpdate: any = {};

    if (title !== "") bookToUpdate.title = title;
    if (author !== "") bookToUpdate.author = author;
    if (isbn !== "") bookToUpdate.isbn = isbn;
    if (quantity !== 1) bookToUpdate.quantityAvailable = quantity;
    if (link !== "") bookToUpdate.linkPdf = link;
    if (synopsis !== "") bookToUpdate.description = synopsis;
    if (categories.length > 0) bookToUpdate.category = categories;

    try {
      if (id) {
        await BookService.update(id, bookToUpdate);

        if (imageFile) {
          console.log("Enviando imagem:", imageFile);
          await BookService.uploadImage(id, imageFile);
        }

        navigate(0);
      }
    } catch (error) {
      console.error("Erro ao atualizar livro: ", error);
      setMessage({ message: "Erro ao atualizar livro: " + error, type: "danger" });
    }
  };


  return (
    <Style.container>
      <Navbar />
      <Style.HeaderContent>
        <Style.BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </Style.BackButton>
        <Style.HeaderTitle>{"Edit Book"}</Style.HeaderTitle>
        {message && message.message && (
          <WarnComponent
            value={message.message}
            type={message.type as "danger" | "success"}
          />
        )}
      </Style.HeaderContent>

      <Style.mainContent>
        <Style.column>
          <Style.ImageContainer>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Book Cover"
                onClick={() => setShowFullImage(true)}
                style={{ cursor: "pointer" }}
              />

            ) : (
              <div className="placeholder">
                <span>No Cover</span>
              </div>
            )}

            <button className="image-button" onClick={handleImageButton}>
              {imagePreview ? "−" : "+"}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </Style.ImageContainer>
        </Style.column>

        <Style.column>
          <div>
            <InputComponent
              icon={<FaIcons.FaBook />}
              placeholder={title}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <InputComponent
              icon={<FaIcons.FaUser />}
              placeholder={author}
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <InputComponent
              icon={<FaIcons.FaBarcode />}
              placeholder={isbn}
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
            <InputComponent
              icon={<FaIcons.FaHashtag />}
              placeholder={quantity.toString()}
              type="number"
              value={quantity.toString()}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
            <InputComponent
              icon={<FaIcons.FaLink />}
              placeholder={link}
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <InputComponent
              icon={<FaIcons.FaTag />}
              placeholder={categoryInput || "Category (press Enter to add)"}
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && categoryInput.trim() !== "") {
                  e.preventDefault();
                  const newCategory = categoryInput.trim();
                  if (!categories.includes(newCategory)) {
                    setCategories([...categories, newCategory]);
                  }
                  setCategoryInput("");
                }
              }}
            />

            {categories.length > 0 && (
              <div className="category-tags">
                {categories.map((cat, index) => (
                  <span key={index} className="tag">
                    {cat}
                    <button
                      onClick={() => {
                        setCategories(categories.filter((c) => c !== cat));
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </Style.column>

        <Style.column>
        <div className="textareaWrapper">
            <label>Synopsis</label>
            <textarea
                placeholder="Enter the book description . . ."
                maxLength={5000}
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
              />
              <div className="char-count">
                {synopsis.length}/5000 caracteres
              </div>
          </div>
          <div className="buttons">
            <ButtonComponent
              placeholder="Cancel"
              type="button"
              onClick={() => navigate(-1)}
            />
            <ButtonComponent
              placeholder="Update Book"
              type="button"
              onClick={handleSubmit}
            />
          </div>
        </Style.column>
      </Style.mainContent>

      {showFullImage && (
        <Style.ImageModal onClick={() => setShowFullImage(false)}>
          <img src={imagePreview} alt="Full Cover" />
        </Style.ImageModal>
      )}

    </Style.container>
  );
};

export default EditBook;