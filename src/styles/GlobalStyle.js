import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
   body {
     font-family: "Monaco", monospace;
     transition: all 0.50s linear; 
     background-color: ${({ theme }) => theme.background};
  }
`