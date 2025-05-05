import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
      justify-items: center;
  }
`;

export const BooksList = styled.div`
  display: grid;
  height: 100%;
  width: 100%;

  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
`;

export const SearchItemsContainer = styled.div`
  padding: 2rem;
  width: 100%;
`;
