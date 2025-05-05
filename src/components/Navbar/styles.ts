import styled from "styled-components";
import { hexToRgba } from "../../utils/themes/HexToRgba";

export const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.textHighlight};
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const SearchButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.primaryInverted};
  border: 2px solid ${({ theme }) => theme.primaryInverted};
  padding: 0.45rem 1.2rem; // Reduzi um pouco
  border-radius: 5px;
  cursor: pointer;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    box-shadow: 0 0 4px ${({ theme }) => hexToRgba(theme.primaryInverted, 1)};
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }
`;


export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 769px) {
    width: auto;
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Inter", sans-serif;
  text-align: center;
`;

export const SearchIconWrapper = styled.span`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

interface DropdownProps {
  $open: boolean;
}

export const DropdownContent = styled.div<DropdownProps>`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? "500px" : "0")};
  transition: max-height 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  padding: ${({ $open }) => ($open ? "1rem 2rem" : "0 2rem")};
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const DesktopContent = styled.div`
  display: none;

  @media (min-width: 769px) {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex: 1;
    justify-content: flex-end;
  }
`;


export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    color: ${({ theme }) => theme.textHighlight};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  max-width: 500px;
  width: 100%;

  @media (max-width: 1150px) {
    max-width: 350px;
  }

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;


export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  min-width: 0;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.secondary};
  }
`;


export const Toggler = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textHighlight};
  margin-top: 0.25rem;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: block;

  @media (min-width: 769px) {
    display: none;
  }
`;
