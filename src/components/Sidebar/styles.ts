import styled from "styled-components";

export const Title = styled.h2`
  margin-top: 2rem;
  padding-left: 1rem;
`;

export const Container = styled.div`
  height: 100%;
  width: 25%;
  margin-right: 2rem;
  max-width: 346px;
  gap: 2rem;

  display: flex;
  flex-direction: column;

  & > :nth-child(2) {
    margin: 15px 0px;
    min-height: 15%;
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    margin-right: 0;
    padding: 1rem 2rem;
  }
`;

export const Genders = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem;
  min-height: 2rem;
`;

export const GenderContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  padding: 0.25rem 0.5rem;
  border-radius: 9px;
  font-size: 0.875rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  text-align: center;

  text-transform: uppercase;

  transition: background ease-in-out 100ms;

  min-width: 100px; 
  height: 2rem; 
  line-height: 2.5rem; 
  
  svg {
    margin-left: 0.5rem;
    font-size: .7rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;