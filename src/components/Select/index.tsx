import React from "react";
import { Select } from "./styles"; 
import { SelectProps } from "../../types/components/select";

export const SelectComponent: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  styles,
  disabled,
  isFull,
}) => {
  let classSelect: string = isFull ? "full" : "";

  return (
    <Select 
      style={styles}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={classSelect}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};