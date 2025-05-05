import styled from "styled-components";
import { hexToRgba } from "../../utils/themes/HexToRgba";

export const Container = styled.article`
  background: none;
  border-bottom: 2px solid ${({ theme }) => theme.accent};
  width: 100%;
  max-width: 340px;
  min-width: 260px;
  height: auto;

  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }
`;


export const NoCover = styled.div`
  height: 120px;
  width: 100px;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => hexToRgba(theme.accent, 0.5)};
`;

export const Image = styled.img`
  height: 120px;
  width: 100px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;


export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;

  @media (max-width: 400px) {
    width: 100%;
  }
`;


export const Title = styled.h4`
  margin: 0;
  font-weight: bold;
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  color: #555;

  time {
    font-style: italic;
  }
`;
