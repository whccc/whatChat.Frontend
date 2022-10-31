import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 
    html,body{
        height: 100%;
        position: relative;
    }
    h1,h2,h4,h5,h6{
        margin:0;
    }

    body{
        background-color:#92bee4;
        font-family:MontserratRegular;
    }

    hr{
        border:none;
        margin-top: 20px;
        margin-bottom: 20px;
        border-bottom: 0.5px solid #ddd ;    
        position: relative;
        left: -20px;
        width: calc(100% + 40px);
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
      --color-four:#2196f3;
      --color-six: #1faeef;
      --color-seven: #ff9a10;
      --color-eight:#dd8b07;
      --color-nine:#d02b2b;
      --color-ten:#2f7e05;
    }

    @font-face {
        font-family: 'MontserratSemiBold';
        src: url(".././fonts/Montserrat-SemiBold.ttf") format('truetype');
    }

    @font-face {
        font-family: 'MontserratRegular';
        src: url(".././fonts/Montserrat-Regular.ttf") format('truetype');
    }

    .text-left{
        text-align: left;
    }

    .text-right{
        text-align: right;
    }

    .margin-right{
        margin-right: 14px;
    }

`;

export default GlobalStyle;
