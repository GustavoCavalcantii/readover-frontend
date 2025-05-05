import styled from 'styled-components';

const sansSerifFont = ['"Inter"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(',');
const serifFont = '"Georgia", "Times New Roman", serif';

export const container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  font-family: ${sansSerifFont};
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

export const mainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  width: 100%;
  margin: 0 auto;
  padding: 3rem;
  background-color: ${({ theme }) => theme.background};
  text-align: center;

  @media (min-width: 949px) {
    flex-direction: row;
    gap: 3rem;
    text-align: left;
  }
`;

export const column = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  min-width: 250px;
  flex: 1;

  &:first-of-type {
    align-items: center;
  }

  label {
    text-align: center;
    background-color:${({ theme }) => theme.accent}; 
    font-size: 1rem;
    font-weight: bold;
    width: 100;
    padding: .35rem;
    font-family: ${serifFont};
    color: ${({ theme }) => theme.primary};
  }

  textarea {
    width: 100%;
    background-color: ${({ theme }) => theme.accent};
    min-height: 300px;
    max-height: 300px;
    font-size: 1rem;
    resize: vertical;
    padding: 2rem;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 5px;
    color: ${({ theme }) => theme.text}
  }

  .textareaWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align:center;

        .char-count {
      text-align: right;
      font-size: 0.85rem;
      color: ${({ theme }) => theme.secondary};
      margin-top: 0.25rem;
}
   }

  .textareaWrapper label {
    font-size: 1rem;
    font-weight: bold;
    font-family: ${serifFont};
    color: ${({ theme }) => theme.primary};
    width: 100%;
    padding-left: 0.5rem;
    border-radius: 5px 5px 0 0;
   }

    .textareaWrapper textarea {
    width: 100%;
    background-color: ${({ theme }) => theme.accent};
    min-height: 300px;
    max-height: 300px;
    font-size: 1rem;
    resize: vertical;
    padding: 2rem;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 0 0 5px 5px;
    color: ${({ theme }) => theme.text};
    }


  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  button {
    align-self: center;
  }

  .buttons{
    display: flex;
    justify-content: space-between;
  }

  .category-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    min-height: 2rem;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: bold;
  }

  .tag button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.background};
    margin-left: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export const ImageContainer = styled.div`
  width: 200px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img,
  .placeholder {
    width: 100%;
    height: 330px;
    border-radius: 8px;
    object-fit: cover;
    background-color: ${({ theme }) => theme.accent};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #444;
    font-style: italic;
    font-size: 0.9rem;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  }

  .image-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.secondary};
    }
  }
`;

export const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: zoom-out;

  img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 8px;
  }
`;