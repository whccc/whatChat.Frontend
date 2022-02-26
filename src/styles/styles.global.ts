import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 
    html,body{
            height: 100%;
                position: relative;
        }

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
    input{
        outline: none;
    }
    :root{
      --color-one:#f0f2f5;
      --color-two:#54656f;
      --color-white:#fff;
      --color-three:#e9edef;
    }

`;

export default GlobalStyle;
