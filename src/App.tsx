import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from "./utils/themes/ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { useEffect, useState } from "react";

function InnerApp() {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRoutes />
    </StyledThemeProvider>
  );
}

function App() {
  const [originalTitle, setOriginalTitle] = useState(document.title);

  useEffect(() => {
    const handleFocus = () => {
      document.title = originalTitle;
    };

    const handleBlur = () => {
      setOriginalTitle(document.title); 
      document.title = "Please, come back! 😢";
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [originalTitle]); 

  return (
    <BrowserRouter>
      <CustomThemeProvider>
        <InnerApp />
      </CustomThemeProvider>
    </BrowserRouter>
  );
}

export default App;
