import styled from "styled-components";
import { hexToRgba } from "../../utils/themes/HexToRgba";

export const Select = styled.select`
  background: none;
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  width: 200px;
  min-width: 130px;
  max-width: 130px;
  cursor: pointer;
  appearance: none; 
  background-color: transparent;

  box-sizing: border-box;

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

  /* Custom arrow styling */
  &::after {
    content: "▼"; 
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;