import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const LeftPanel = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.textHighlight};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;

  p {
    margin: 1rem 0;
    text-align: center;
  }
`;

export const RightPanel = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;

  & > *
  {
    width: 100%;
  }

  h2 {
    font-size: 2rem;
    text-align: center;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
`;

export const Subtitle = styled.h2`
  font-size: 1.2rem;
  font-weight: normal;
`;

export const RoleButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;
