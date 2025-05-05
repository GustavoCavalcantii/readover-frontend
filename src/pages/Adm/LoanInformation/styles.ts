import styled from "styled-components";
import { hexToRgba } from "../../../utils/themes/HexToRgba";

export const container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

export const HeaderContent = styled.div`
  position: relative;
  width: 100%;
  padding: 2rem 0;
  text-align: center;

  @media (min-width: 569px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 469px) {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const BackButton = styled.button`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  z-index: 10;

  @media (max-width: 469px) {
    margin-top: -2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.secondary};
  }
`;

export const mainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  padding: 3rem;
  background-color: ${({ theme }) => theme.background};
  text-align: center;

  @media (min-width: 949px) {
    flex-direction: row;
    gap: 3rem;
    justify-content: center; 
    align-items: flex-start;
    text-align: left;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem auto;
  width: 40%;

  @media (max-width: 949px) {
    width: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

export const column = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  height: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 12px;

  &:first-of-type {
    align-items: center;
  }

  label {
    text-align: center;
    background-color: ${({ theme }) => theme.accent};
    font-size: 1rem;
    font-weight: bold;
    width: 100;
    padding: 0.35rem;
    color: ${({ theme }) => theme.primary};
  }

  textarea {
    width: 100%;
    background-color: ${({ theme }) => theme.accent};
    min-height: 300px;
    height: 100%;
    font-size: 1rem;
    resize: vertical;
    padding: 2rem;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 5px;
    color: ${({ theme }) => theme.text};
  }

  .textareaWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  .textareaWrapper label {
    font-size: 1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
    width: 100%;
    padding-left: 0.5rem;
  }

  .textareaWrapper textarea {
    width: 100%;
    background-color: ${({ theme }) => theme.accent};
    min-height: 300px;
    max-height: 300px;
    font-size: 1rem;
    resize: vertical;
    padding: 2rem;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 5px;
    color: ${({ theme }) => theme.text};
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  button {
    align-self: center;
  }

  .buttons {
    display: flex;
    justify-content: end;
  }
`;

export const Image = styled.div`
  width: 200px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 10px;

  img,
  .placeholder {
    width: 100%;
    height: 330px;
    border-radius: 8px;
    object-fit: cover;
    background-color: ${({ theme }) => theme.accent};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #444;
    font-style: italic;
    font-size: 0.9rem;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const NoCover = styled.div`
  height: 250px;
  width: 400px;

  max-width: 90%;
  aspect-ratio: 2/1;

  background-color: ${({ theme }) => hexToRgba(theme.accent, 0.5)};

  @media (max-width: 949px) {
    margin: auto;
  }
`;

export const Status = styled.div`
  background: ${({ theme }) => hexToRgba(theme.success, 0.3)};
  color: ${({ theme }) => theme.success};
  width: fit-content;
  padding: 0.1rem 1rem;
  margin-top: 20px;
    justify-content: center;
    align-items: center;
  border-radius: 5px;

  &.danger {
    background: ${({ theme }) => hexToRgba(theme.danger, 0.5)};
    color: ${({ theme }) => theme.danger};
  }

  @media (max-width: 949px) {
    justify-content: center;
    display: flex;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-around;
`;