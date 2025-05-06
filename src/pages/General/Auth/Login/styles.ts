import styled from "styled-components";
import { ContainerProps } from "../../../../types/layouts/layout";

export const Subtitle = styled.h2`
  margin-top: 10px;
  margin-bottom: 30px;
`;

export const Paragraph = styled.p`
  margin-top: 10px;
  margin-bottom: 30px;
`;

export const Container = styled.div<ContainerProps>`
  @media (min-width: 700px) {
    height: 100%;
  }

  position: relative;

  .overlay-container {
    transform: ${({ $rightPanelActive }) =>
      $rightPanelActive ? "translateX(-100%)" : "none"};

    @media (max-width: 710px) {
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transform: ${({ $rightPanelActive }) =>
        $rightPanelActive ? "translateY(-50%)" : "none"};
    }
  }

  .overlay {
    transform: ${({ $rightPanelActive }) =>
      $rightPanelActive ? "translateX(50%)" : "translateX(0)"};
    transition: transform 0.6s ease-in-out;

    @media (max-width: 710px) {
      transform: ${({ $rightPanelActive }) =>
          $rightPanelActive ? "translateY(0)" : "translateY(50%)"}
        translateX(0);

      height: 90%;
    }
  }

  .overlay-left {
    transform: ${({ $rightPanelActive }) =>
      $rightPanelActive ? "translateX(0)" : "translateX(-20%)"};

    @media (max-width: 710px) {
      transform: ${({ $rightPanelActive }) =>
          $rightPanelActive ? "translateY(24%)" : "translateY(-200%)"}
        translateX(0);
    }
  }

  .overlay-right {
    right: 0;
    transform: ${({ $rightPanelActive }) =>
      $rightPanelActive ? "translateX(20%)" : "translateX(0)"};

    @media (max-width: 710px) {
      transform: ${({ $rightPanelActive }) =>
          $rightPanelActive ? "translateY(100%)" : "translateY(-20%)"}
        translateX(0);
    }
  }

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }
    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  transition: all 0.6s ease-in-out;

  @media (max-width: 710px) {
    flex-direction: column;
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
`;

export const Overlay = styled.div`
  background-color: ${({ theme }) => theme.primary};
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  text-align: center;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  color: ${({ theme }) => theme.textHighlight};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const OverlayLeft = styled(OverlayPanel)`
  transform: translateX(-30%);

  @media (max-width: 710px) {
    right: 0;
  }
`;

export const OverlayRight = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
`;
