import styled from "styled-components";
import { hexToRgba } from "../../../../utils/themes/HexToRgba";

export const Container = styled.div`
  display: flex;
  height: 80vh;
  width: 50%;

  margin: auto;
  border-radius: 5px;

  box-shadow: 0 2px 8px ${({ theme }) => hexToRgba(theme.primary, 0.5)};
  border: 0.5px solid ${({ theme }) => theme.primary};

  @media (max-width: 800px) {
    width: 90%;
  }
`;

export const RightPanel = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;

  & > * {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2rem;
`;

export const Subtitle = styled.h3`
  font-size: 1.3rem;
  font-weight: normal;

  text-align: center;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2rem;
`;

export const RoleButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;
