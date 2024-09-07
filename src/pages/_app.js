import Layout from "@/components/common/Layout";
import "@/styles/globals.css";
import { GlobalStyles } from "@/styles/GlobalStyle";
import { darkTheme, lightTheme } from "@/theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "../../context";


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ThemedApp Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

function ThemedApp({ Component, pageProps }) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer autoClose={2000} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StyledThemeProvider>
  );
}
