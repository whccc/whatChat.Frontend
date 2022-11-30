import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: 1s ${fadeIn} ease-in-out;
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-left: 1px solid var(--color-three);
  background-color: var(--color-one);
  height: 60px;
  padding-left: 10px;
  padding-right: 10px;
  & > div:nth-child(1) {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    & img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }

    & > div:nth-child(1) {
      padding-right: 10px;
    }
  }

  & > div:nth-child(2) {
    flex: 1 1 auto;
    width: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    & > div {
      cursor: pointer;
    }
  }
`;

export const ContainerMessage = styled.div`
  height: 100%;
  overflow: auto;
`;

export const ContainerSendMessage = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-three);
  & i {
    cursor: pointer;
  }
  & > div:nth-child(1),
  & > div:nth-child(3) {
    width: 10%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  & > div:nth-child(2) {
    width: 90%;
  }
`;
export const ContainerImgInitial = styled.div`
  width: 250px;
  background-color: #fff;
  border-radius: 100%;
  height: 250px;
  margin: auto;
  animation: 1s ${fadeIn} ease-in-out;
  h1 {
    text-align: center;
  }
  & img {
    width: 100%;
    height: 100%;
  }
  -webkit-box-shadow: 0px 32px 44px -7px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 32px 44px -7px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 32px 44px -7px rgba(0, 0, 0, 0.4);
`;
