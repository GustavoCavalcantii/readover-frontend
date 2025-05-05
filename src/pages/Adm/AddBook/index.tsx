import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../components/Button/index";
import { InputComponent } from "../../../components/TextInput";
import Navbar from "../../../components/Navbar/Admin/index";
import * as FaIcons from "react-icons/fa";
import * as Style from "./styles";
import { BookService } from "../../../services/Book/BookService";
import WarnComponent from "../../../components/WarnComponent";
import { getBookValidationErrors } from "../../../utils/BookValidate";

const AddBook: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [message, setMessage] = useState({ message: "", type: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Book | Readover";
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const book = {
      title,
      author,
      isbn,
      quantityAvailable: quantity,
      category: categories,
      linkPdf: link,
      description: synopsis,
      image: imagePreview || "",
    };

    const errors = getBookValidationErrors(book);

    try {
      const createdBook = await BookService.create(book);
      if (createdBook?.id && imageFile) {
        await BookService.uploadImage(createdBook.id, imageFile);
      }
      setMessage({ message: "Book added successfully!", type: "success" });
      setFieldErrors({});
    } catch (error) {
      setMessage({ message: "Error: " + error, type: "danger" });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageButton = () => {
    if (imagePreview) {
      setImagePreview(null);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleClearForm = () => {
    setTitle("");
    setAuthor("");
    setIsbn("");
    setQuantity(0);
    setCategoryInput("");
    setCategories([]);
    setLink("");
    setSynopsis("");
    setImagePreview(null);
  };

  return (
    <Style.container>
      <Navbar />
      <Style.HeaderContent>
        <Style.BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </Style.BackButton>
        <Style.HeaderTitle>Add Book</Style.HeaderTitle>

        {Object.values(fieldErrors).map((err, idx) => (
          <WarnComponent key={idx} value={err} type="danger" />
        ))}

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
              <img src={imagePreview} alt="Book Cover" />
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
              placeholder="Title (1 - 60)"
              type="text"
              value={title}
              minLength={1}
              maxLength={60}
              onChange={(e) => setTitle(e.target.value)}
            />
            <InputComponent
              icon={<FaIcons.FaUser />}
              placeholder="Author (1- 60)"
              type="text"
              value={author}
              minLength={1}
              maxLength={60}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <InputComponent
              icon={<FaIcons.FaBarcode />}
              placeholder="ISBN (10 - 15)"
              type="text"
              value={isbn}
              minLength={10}
              maxLength={15}
              onChange={(e) => setIsbn(e.target.value)}
            />
            <InputComponent
              icon={<FaIcons.FaHashtag />}
              placeholder="Quantity"
              type="number"
              value={quantity.toString()}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            />

            <InputComponent
              icon={<FaIcons.FaLink />}
              placeholder="Link (10 - 150)"
              type="text"
              value={link}
              minLength={10}
              maxLength={150}
              onChange={(e) => setLink(e.target.value)}
            />

            <InputComponent
              icon={<FaIcons.FaTag />}
              placeholder="Category (press Enter to add)"
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
              onClick={handleClearForm}
            />
            <ButtonComponent
              placeholder="Add Book"
              type="button"
              onClick={handleSubmit}
            />
          </div>
        </Style.column>
      </Style.mainContent>
    </Style.container>
  );
};

export default AddBook;
