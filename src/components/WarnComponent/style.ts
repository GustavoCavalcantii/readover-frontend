import styled from "styled-components";
import { hexToRgba } from "../../utils/themes/HexToRgba";

export const Container = styled.div`
  width: 250px;
  max-width: 80%;

  margin: 1rem;
  text-align: center;
  border-radius: 3px;

  color: ${({ theme }) => theme.success};
  background: ${({ theme }) => hexToRgba(theme.success, 0.3)};

  &.danger {
    color: ${({ theme }) => theme.danger};
    background: ${({ theme }) => hexToRgba(theme.danger, 0.3)};
  }
`;
