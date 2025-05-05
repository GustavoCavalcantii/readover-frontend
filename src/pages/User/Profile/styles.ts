import styled from "styled-components";

export const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputChange = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  & *:first-child {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
  width: fit-content;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;


export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SelfContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
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