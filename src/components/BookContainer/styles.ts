import styled from "styled-components";
import { hexToRgba } from "../../utils/themes/HexToRgba";

export const Container = styled.div`
  width: 280px;
  height: 350px;
  border-radius: 4px;
  border: 0.5px solid ${({ theme }) => theme.accent};
  cursor: pointer;

  padding: 1rem;

  background-color: ${({ theme }) => theme.foreground};
  transition: all ease-in-out 100ms;

  &:hover {

    transform: scale(1.01);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
  margin-bottom: 8px;
`;

export const GendersList = styled.div`
  color: ${({ theme }) => theme.textMedium};
  font-size: .7rem;

  margin-top: 5px;
`;

export const NoCover = styled.div`
  width: 100%;
  height: 55%;
  margin-bottom: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => hexToRgba(theme.accent, 0.5)};
`;

export const Author = styled.p`
  color: ${({ theme }) => theme.textMedium};
  margin-bottom: 6px;
`;

export const Available = styled.p`
  color: ${({ theme }) => theme.success};
  background: ${({ theme }) => hexToRgba(theme.success, 0.3)};

  width: fit-content;
  padding: 0.05rem 0.5rem;
  border-radius: 5px;

  &.not {
    color: ${({ theme }) => theme.danger};
    background: ${({ theme }) => hexToRgba(theme.danger, 0.3)};
  }
`;
