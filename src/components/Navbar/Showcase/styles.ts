import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background-color: transparent;
  color: ${({ theme }) => theme.textHighlight};
  padding: 1rem 2rem;
  display: flex;
  margin-right: 2rem;
  margin-left: 2rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid white;
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    flex-direction: column;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
    border-bottom: none;
    align-items: stretch;
    margin-right: 0;
    margin-left: 0;
  }
`;


export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 769px) {
    width: auto;
    margin-right: auto;
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
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  padding: ${({ $open }) => ($open ? "1rem 2rem" : "0 2rem")};
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  a {
    color: ${({ theme }) => theme.primary};
  }

  @media (min-width: 769px) {
    display: none;
  }
`;



export const DesktopContent = styled.div`
  display: none;

  @media (min-width: 769px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 2rem;
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

    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;

    a {
      color: ${({ theme }) => theme.primary};
    }
  }
`;



export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;
export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  width: 100%;
  max-width: 500px;
  font-size: 1rem;

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

  svg {
    color: ${({ theme }) => theme.primary};
  }

  @media (min-width: 769px) {
    display: none;
  }
`;