import React from "react";
import * as Style from "./styles";
import { LoanProps } from "../../types/components/loan";

const statusXColor = {
  "active": "",
  "returned": "",
  "late": "danger",
  "rejected": "warn",
  "pending": "warn",
};



export const DeliveryCard: React.FC<LoanProps> = ({ title, borrower, expectedReturnDate, onClick, image, status, isClickable = true }) => {
  const formattedDate = new Date(expectedReturnDate).toLocaleDateString("pt-BR");

  const statusClass = statusXColor[status as keyof typeof statusXColor] ?? "";

  return (
    <Style.Container className={isClickable ? "clicable" : ""} onClick={onClick}>
      {image ? <Style.Image src={image} /> :
        <Style.NoCover> NO COVER</Style.NoCover>}

      <Style.Info>
        <Style.Title>{title}</Style.Title>
        <Style.Meta>
          <time dateTime={expectedReturnDate}>Expected Date: {formattedDate}</time>
          <span>Borrower: {borrower}</span>
          <Style.LoanStatus className={statusClass}>{status}</Style.LoanStatus>
        </Style.Meta>
      </Style.Info>
    </Style.Container>
  );
};
