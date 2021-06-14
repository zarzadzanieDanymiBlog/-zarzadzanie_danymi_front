import { createGlobalStyle } from "styled-components";

/** globalne style  */
const globalStyles = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  }
  body {
    min-height: 100vh;
  }
`;

export default globalStyles;
