import styled from "styled-components";

export const FooterInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;

export const Footer = styled.footer`
  background-color:  ${({ theme }) => theme.primary};
  padding: 2rem 1rem;
  color:  ${({ theme }) => theme.background};
`;

export const ContactText = styled.p`
  margin: 0.3rem 0;
  font-size: 15px;
  color:  ${({ theme }) => theme.background};
  opacity: 0.9;
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  &:first-child {
    max-width: 320px;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    
    &:first-child {
      max-width: 100%;
    }
  }
`;

export const FooterTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  color:  ${({ theme }) => theme.background};
  font-weight: 600;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 2px;
    background-color: ${({ theme }) => theme.background};

    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export const FooterText = styled.p`
  font-size: 15px;
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
`;

export const FooterLink = styled.a`
  color:  ${({ theme }) => theme.background};
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.9;
  
  &:hover {
    color: ${({ theme }) => theme.background};
    opacity: 1;
    transform: translateX(3px);
  }

  svg {
    font-size: 1.1rem;
  }
`;

export const Copyright = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.875rem;
  opacity: 0.7;
  width: 100%;
`;