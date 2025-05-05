import React, { useState } from "react";
import { InputProps } from "../../types/components/textInput";
import { InputContainer, Input } from "./styles.ts";

export const InputComponent: React.FC<InputProps> = ({
  placeholder,
  name,
  icon,
  styles,
  type = "text",
  onClick,
  onChange,
  onKeyDown,
  autoComplete,
  value,
  readOnly,
  maxLength,
  minLength
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <InputContainer className={focus ? "focus" : ""}>
      {icon}
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        style={styles}
        onClick={onClick}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        readOnly={readOnly}
        maxLength={maxLength}
        minLength={minLength}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoComplete={autoComplete}
      />
    </InputContainer>
  );
};
