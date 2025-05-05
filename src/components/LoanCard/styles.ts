import styled from "styled-components";
import { hexToRgba } from "../../utils/themes/HexToRgba";
export const Container = styled.article`
  background: ${({ theme }) => theme.foreground};
  border: 0.5px solid ${({ theme }) => theme.accent};
  width: 100%;
  max-width: 360px;
  min-width: 260px;
  min-height: 200px;
  max-height: fit-content;

  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Sombra suave */
  }

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
  }
`;


export const LoanStatus = styled.div`
  width: fit-content;

  text-align: center;
  border-radius: 3px;
  padding: 0.2rem 1rem;

  color: ${({ theme }) => theme.success};
  background: ${({ theme }) => hexToRgba(theme.success, 0.3)};

  &.danger {
    color: ${({ theme }) => theme.danger};
    background: ${({ theme }) => hexToRgba(theme.danger, 0.3)};
  }

  &.warn {
    color: ${({ theme }) => theme.warn};
    background: ${({ theme }) => hexToRgba(theme.warn, 0.3)};
  }

  @media (max-width: 420px) {
    margin: auto;
  }
`;

export const NoCover = styled.div`
  height: 110px;
  width: 100px;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => hexToRgba(theme.accent, 0.5)};
`;

export const Image = styled.img`
  height: 110px;
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

  @media (max-width: 420px) {
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
