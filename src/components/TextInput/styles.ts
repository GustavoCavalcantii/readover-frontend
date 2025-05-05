import styled from "styled-components";
import { hexToRgba } from "../../utils/themes/HexToRgba";

export const InputContainer = styled.div`
  background: none;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 5px;
  color: ${({ theme }) => theme.primary};
  transition: box-shadow 0.2s ease;
  cursor: text;

  max-width: 546px;

  &.focus,
  &:hover {
    box-shadow: 0 0 4px ${({ theme }) => hexToRgba(theme.primary, 1)};
  }

  svg {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    flex-shrink: 0;
  }
`;

export const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  color: inherit;
  font: inherit;
  padding: 0.5rem;
`;
