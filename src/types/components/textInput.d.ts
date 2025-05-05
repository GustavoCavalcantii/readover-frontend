import React from "react";

export type InputProps = {
  placeholder: string;
  name?: string;
  icon?: JSX.Element;
  styles?: React.CSSProperties;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  maxLength?: int;
  minLength?: int;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  readOnly?: boolean;
};
