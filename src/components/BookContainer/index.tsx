import React from "react";
import { BookContainerProps } from "../../types/components/bookContainer";
import * as Style from "./styles.ts";
import { truncateText } from "../../utils/TextUtils.ts";

export const BookContainer: React.FC<BookContainerProps> = ({
  title,
  image,
  author,
  isAvailable,
  genders,
  onClick
}) => {
  return (
    <Style.Container onClick={onClick}>
      {image ? (
        <Style.Image src={image} alt={`Cover of ${title}`} />
      ) : (
        <Style.NoCover>NO COVER</Style.NoCover>
      )}

      <h3 title={title}>{truncateText(title, 20)}</h3>
      <Style.Author title={author}>{truncateText(author, 20)}</Style.Author>
      <Style.Available className={isAvailable ? "" : "not"}>
        {isAvailable ? "available" : "not available"}
      </Style.Available>
      <Style.GendersList title={genders.join(",")}>
        {truncateText(genders.join(", "), 20)}
      </Style.GendersList>
    </Style.Container>
  );
};
