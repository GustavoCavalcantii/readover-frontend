import React from "react";
import * as Style from "./style";
import { WarnComponentProps } from "../../types/components/warnComponent";

const WarnComponent: React.FC<WarnComponentProps> = ({ value, type }) => {
  return (
    <Style.Container className={type == "danger" ? "danger" : ""}>
      {value}
    </Style.Container>
  );
};

export default WarnComponent;
