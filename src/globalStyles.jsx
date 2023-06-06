import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #bbe8ae5f;
    font-family: 'Geologica', sans-serif;
  }
  h1, h2, h3, h4, h5, h6,p,a {
    font-family: 'Geologica', sans-serif;
  }
  a{
    :hover{
      transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
            scale: 1.1;
            cursor: pointer;
            font-weight: 700;
  
        }
  }
`;

export default GlobalStyle;
