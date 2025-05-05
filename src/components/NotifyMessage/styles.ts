import styled, { keyframes } from "styled-components";

export const slideIn = keyframes`
  from {
    transform: translateX(120%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  z-index: 1000;
`;

export const Notification = styled.div`
  background: #ff4d4f;
  color: #fff;
  padding: 14px 18px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  min-width: 280px;
  position: relative;
  animation: ${slideIn} 0.3s ease-out;
`;

export const Message = styled.div`
  font-size: 14px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #ffd1d1;
  }
`;