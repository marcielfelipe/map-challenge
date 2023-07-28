import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean; }>`
  *{
    margin: 0;
    border: none;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    color: ${props => (props.$whiteColor ? 'white' : 'black')};
    width: 100vw;
  }
  button{
    font-weight:700;
  }
`