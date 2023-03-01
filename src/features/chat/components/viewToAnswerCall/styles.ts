import styled from "styled-components";

export const WrapperViewToAnswerCall = styled.div`
  position: fixed;

  background-color: rgba(31, 174, 239, 0.8);
  width: 100%;
  height: 100%;
  z-index: 5;
  top: 0;
  left: 0;
  & > div {
    width: 80%;
    margin: auto;
    padding: 20px;
  }
  & > div > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  text-align: center;
  & button {
    background-color: var(--color-nine);
    border: transparent;
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-top: 20px;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;

export const WrapperVideo = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid red;
`;
