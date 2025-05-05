import styled from "styled-components";
import { hexToRgba } from "../../utils/themes/HexToRgba";

export const Button = styled.button`
  background: none;
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  width: 30%;
  min-width: 100px;
  max-width: 223px;
  cursor: pointer;

  &.full {
    background-color: ${({ theme }) => theme.primaryInverted};
    color: ${({ theme }) => theme.primary};
    border: none;
    
    &.inverted {
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.primaryInverted};
    }
  }

  &.inverted {
    border: 2px solid ${({ theme }) => theme.primaryInverted};
    color: ${({ theme }) => theme.primaryInverted};

    &:hover {
      box-shadow: 0 0 4px ${({ theme }) => hexToRgba(theme.primaryInverted, 1)};
    }
  }

  &:hover {
    box-shadow: 0 0 4px ${({ theme }) => hexToRgba(theme.primary, 1)};
  }
`;