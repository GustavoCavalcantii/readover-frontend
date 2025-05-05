import React, { useState } from "react";
import { TextAndValueProps } from "../../types/components/textAndValue";
import * as Style from "./styles"

export const TextAndValue: React.FC<TextAndValueProps> = ({ title, value }) => {
  return (
    <Style.Container>
      <h4>{title}</h4>
      <p>{value}</p>
    </Style.Container>
  );
};
