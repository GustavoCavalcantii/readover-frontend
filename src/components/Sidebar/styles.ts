import styled from "styled-components";

export const Title = styled.h2`
  margin-top: 1rem;
  padding-left: 0.5rem;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    font-size: 1.2rem;
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 25%;
  min-width: 250px;
  margin-right: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;

  & > :nth-child(2) {
    margin: 10px 0;
    min-height: 15%;
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    margin-right: 0;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    
    & > :nth-child(2) {
      border-bottom: none;
      margin: 5px 0;
    }
  }
`;

export const Genders = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.25rem;
  min-height: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
    padding: 0;
  }
`;

export const GenderContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  text-align: center;
  text-transform: uppercase;
  transition: background ease-in-out 100ms;
  height: 1.8rem;
  
  svg {
    margin-left: 0.3rem;
    font-size: 0.6rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  @media (max-width: 768px) {
    height: 1.6rem;
    font-size: 0.65rem;
    padding: 0.2rem 0.4rem;
    
    svg {
      margin-left: 0.2rem;
    }
  }

  @media (hover: none) {
    &:hover {
      background-color: ${({ theme }) => theme.primary};
    }
    &:active {
      background-color: ${({ theme }) => theme.secondary};
    }
  }
`;