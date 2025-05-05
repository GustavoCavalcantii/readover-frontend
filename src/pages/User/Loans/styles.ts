import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  place-items: start;

  gap: 1rem;
  padding: 2rem;
  height: 100%;
  width: 100%;
`;

export const AppContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  font-size: clamp(1.5rem, 2vw + 1rem, 2.5rem);
  text-align: center;
  margin: 2rem auto;
  color: ${({ theme }) => theme.primary};
`;


export const BooksList = styled.div`
  display: flex;

  height: 100%;
  width: 100%;

  flex-direction: column;
  height: 100%;
  gap: 1.2rem;

  background-color: ${({theme}) => theme.primary};
`;

export const SearchItemsContainer = styled.div`
  padding: 2rem;
  width: 100%;
`;