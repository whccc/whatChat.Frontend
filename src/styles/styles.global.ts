import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  

    body{
        background-color: rgba(94,155,216,0.4);
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
    hr{
        border:none;
        border-bottom: 0.5px solid #ddd ;
    }
    img{
        object-fit: contain;
    }

`;

export default GlobalStyle;
