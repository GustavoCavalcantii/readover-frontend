import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonComponent } from "../../../components/Button/index";
import { SelectComponent } from "../../../components/Select/index";
import { InputComponent } from "../../../components/TextInput";
import Navbar from "../../../components/Navbar/User/index";
import * as FaIcons from "react-icons/fa";
import * as Style from "./styles";
import { BookService } from "../../../services/Book/BookService";
import { LoanService } from "../../../services/Loan/LoanService";
import { getImageUrl } from "../../../services/Images/FileUtils";
import WarnComponent from "../../../components/WarnComponent";

const BookInformation: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const [synopsis, setSynopsis] = useState("");

  const [message, setMessage] = useState({ message: "", type: "" });


  const options = [
    { label: "7 Days", value: "7" },
    { label: "15 Days", value: "15" },
    { label: "30 Days", value: "30" },
  ];

  const [selectedOption, setSelectedOption] = useState<string>(options[0].value);

  const [showFullImage, setShowFullImage] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      alert("ID não fornecido");
      navigate(-1);
      return;
    }

    const fetchBook = async () => {
      try {
        const book = await BookService.getById(id);

        if (!book) {
          alert("Livro não encontrado");
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
        alert("Erro ao carregar livro: " + error);
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleSubmit = async () => {
    try {
      if (id) {
        const days = parseInt(selectedOption, 10);
        await LoanService.requestLoan(id, days);
        setMessage({ message: "Pedido de empréstimo realizado com sucesso!", type: "success" });
      } else {
        setMessage({message: "Livro ou usuário não encontrado.", type: "danger"});
      }
    } catch (error) {
      console.error("Erro ao solicitar empréstimo:", error);
      setMessage({ message: "Erro ao solicitar empréstimo.", type: "danger" });
    }
  };

  useEffect(() => {
    document.title = title + " | Readover";
  }, [title]);

  return (
    <Style.container>
      <Navbar />
      <Style.HeaderContent>
        <Style.BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </Style.BackButton>
        <Style.HeaderTitle>{"Book Information"}</Style.HeaderTitle>
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
                style={{ cursor: "pointer", maxWidth: "200px" }}
              />
            ) : (
              <div className="placeholder">
                <span>No Cover</span>
              </div>
            )}
          </Style.ImageContainer>

        </Style.column>

        <Style.column>
          <div>
            <InputComponent
              icon={<FaIcons.FaBook />}
              placeholder={title}
              type="text"
              value={title}
              readOnly
            />
            <InputComponent
              icon={<FaIcons.FaUser />}
              placeholder={author}
              type="text"
              value={author}
              readOnly
            />
            <InputComponent
              icon={<FaIcons.FaBarcode />}
              placeholder={isbn}
              type="text"
              value={isbn}
              readOnly
            />
            <InputComponent
              icon={<FaIcons.FaHashtag />}
              placeholder={quantity.toString()}
              type="number"
              value={quantity.toString()}
              readOnly
            />
            <InputComponent
              icon={<FaIcons.FaLink />}
              placeholder={link}
              type="text"
              value={link}
              readOnly
            />
            <InputComponent
              icon={<FaIcons.FaTag />}
              placeholder="Categories"
              type="text"
              value={categories.join(", ")}
              readOnly
            />
          </div>
        </Style.column>

        <Style.column>
          <div className="textareaWrapper">
            <label>Synopsis</label>
            <textarea
              placeholder={synopsis}
              maxLength={5000}
              value={synopsis}
              readOnly
            />
          </div>

          <div className="buttons">

            <SelectComponent
              options={options}
              value={selectedOption}
              onChange={handleSelectChange}
              isFull={false}
            />


            <ButtonComponent
              placeholder="Request Book"
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

export default BookInformation;