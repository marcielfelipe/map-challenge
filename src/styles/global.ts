import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean; }>`
  *{
    margin: 0;
    border: none;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    width: 100vw;
    height: 100vh;
  }
  button{
    font-weight:700;
  }
`