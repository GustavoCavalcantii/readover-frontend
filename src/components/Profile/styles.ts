import styled from "styled-components";
export const ProfileWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`;

export const CameraButton = styled.button`
  position: absolute;
  bottom: 5%;
  right: 10%;
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.textHighlight};
  }

  &:hover {
    background: none;

    svg {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
