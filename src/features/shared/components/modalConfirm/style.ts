import styled, { keyframes } from "styled-components";
import { CardContainer } from "../../../../styles/styles.cardmain";

interface IWrapper {
  typeMessage: string;
}

const opacity = keyframes`
  from  {   
    opacity: 0;
  }
  to { 
    opacity: 1;
  }
`;

export const Wrapper = styled.div<IWrapper>`
  animation: ${opacity} 0.5s;
  position: fixed;
  background-color: ${({ typeMessage }) =>
    typeMessage === "Success"
      ? "rgba(75, 100, 59, 0.62);"
      : "rgba(149, 118, 70, 0.75);"};
  width: 100%;
  overflow: hidden;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const WrapperData = styled.div<IWrapper>`
  max-width: 550px;
  margin: auto;
  margin-top: 50px;
  text-align: center;
  position: relative;
  overflow: hidden;
  ${CardContainer} {
    max-width: 100%;
  }
  h1 {
    color: ${({ typeMessage }) =>
      typeMessage === "Success" ? "var(--color-ten);" : "var(--color-eight);"};
    font-size: 22px;
  }
  span {
    right: 10px;
    top: 10px;
    position: absolute;
    font-weight: 600;
    cursor: pointer;
    color: var(--color-nine);
  }

  p {
    font-size: 14px;
    word-wrap: break-word;
  }
`;
