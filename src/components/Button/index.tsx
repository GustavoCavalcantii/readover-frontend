import React from "react";
import { Button } from "./styles.ts";
import { ButtonProps } from "../../types/components/button";

export const ButtonComponent: React.FC<ButtonProps> = ({
  placeholder,
  type = "button",
  styles,
  isInverted,
  onClick,
  disabled,
  isFull
}) => {
  let classButton:string = isInverted ? "inverted" : "";
  classButton += isFull ? " full" : "";

  return (
    <Button
      type={type}
      style={styles}
      className={classButton}
      onClick={onClick}
      disabled={disabled}
    >
      {placeholder}
    </Button>
  );
};
