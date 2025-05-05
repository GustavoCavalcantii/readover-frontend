import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Hind Madurai', sans-serif;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
  }

  main {
    display: flex;
    flex-direction: column;
  }

  h1 { font-family: "Montserrat", sans-serif; }

  h2 { font-family: "Lora", serif; }
`;


export default GlobalStyle;
