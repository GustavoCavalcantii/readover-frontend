import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../../../components/Navbar/Admin";
import * as Style from "./styles";
import { TextAndValue } from "../../../components/TitleAndValue";
import { ButtonComponent } from "../../../components/Button";
import { Loan } from "../../../types/services/loan";
import { LoanService } from "../../../services/Loan/LoanService";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import { getImageUrl } from "../../../services/Images/FileUtils";
import { ApiService } from "../../../services/ApiService";

const LoanInformation: React.FC = () => {
  const [loan, setLoan] = useState<Loan | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState({ message: "", type: "" });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/adm");
    return;
  }

  useEffect(() => {
    document.title = loan ? `${loan.title} | Readover` : "Loan Info | Readover";
  }, [loan]);

  const handleAproveLoan = async () => {
    try {
      await LoanService.aproveLoan(id);
      setMessage({
        message: "Success",
        type: "success"
      });
      await updateProfile();
    } catch (e) {
      console.warn("Erro ao editar perfil", e);
      setMessage({
        message: "Unknown Error",
        type: "danger"
      });
    }
  }

  const handleReturnedLoan = async () => {
    try {
      await LoanService.returnedLoan(id);
      setMessage({
        message: "Success",
        type: "success"
      });
      await updateProfile();
    } catch (e) {
      console.warn("Erro ao editar perfil", e);
      setMessage({
        message: "Unknown Error",
        type: "danger"
      });
    }
  }

  const handleRejectLoan = async () => {
    try {
      await LoanService.rejectLoan(id);
      setMessage({
        message: "Success",
        type: "success"
      });
      await updateProfile();
    } catch (e) {
      console.warn("Erro ao editar perfil", e);
      setMessage({
        message: "Unknown Error",
        type: "danger"
      });
    }
  }

  const updateProfile = async () => {
    const loan = await LoanService.getLoanById(id);
    setLoan(loan);

    if (loan?.image) {
      const imageUrl = await getImageUrl(loan.image, "livro");
      setImagePreview(imageUrl || null);
    }
  };

  useEffect(() => {
    updateProfile();
  }, []);


  useEffect(() => {
    const fetchImage = async () => {
      if (!loan || !loan.image) return;
      const imageUrl = await getImageUrl(loan.image, "livro");
      setImagePreview(imageUrl || null);
    };
    fetchImage();
  }, []);

  const buttons = (status: string) => {
    if (status === "pending") {
      return (<>
        <ButtonComponent placeholder="Recuse Loan" onClick={handleRejectLoan} />
        <ButtonComponent placeholder="Approve Loan" onClick={handleAproveLoan} />
      </>)
    }

    if (status === "active") {
      return (<>
        <ButtonComponent placeholder="Return Loan" onClick={handleReturnedLoan} />
      </>)
    }

    return ("");
  }

  return (
    <Style.container>
      <Navbar />
      <Style.HeaderContent>
        <Style.BackButton onClick={() => window.history.back()}>
          <FaArrowLeft />
        </Style.BackButton>
        <Style.HeaderTitle>Loan Information</Style.HeaderTitle>
      </Style.HeaderContent>
      <Style.mainContent>
        <Style.column>
          <Style.Image>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Book Cover"
                style={{ cursor: "pointer", maxWidth: "200px" }}
              />
            ) : (
              <div className="placeholder">
                <span>No Cover</span>
              </div>
            )}
          </Style.Image>
        </Style.column>
        <Style.column>
          <Style.InfoContainer>
            <TextAndValue title="Title" value={loan ? loan.title : ""} />
            <TextAndValue title="Borrower" value={loan ? loan.borrower : ""} />
            <TextAndValue title="Expected Date" value={loan ? formatDate(loan.expectedReturnDate) : ""} />
            <TextAndValue title="Actual Return Date" value={loan ? loan.actualReturnDate ? formatDate(loan.actualReturnDate) : "Not returned" : "Not returned"} />
            <Style.Status className="danger">{loan ? loan.status : ""}</Style.Status>
          </Style.InfoContainer>
        </Style.column>
      </Style.mainContent>
      <Style.ButtonWrapper>{loan && loan.status ? buttons(loan.status) : ""}
      </Style.ButtonWrapper>
    </Style.container>
  );
};

export default LoanInformation;