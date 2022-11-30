import styled from "styled-components";

export const Container = styled.div`
  width: 30%;
`;

export const ContainerSectionOne = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: var(--color-one);
  & img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 0.5px solid #ddd;
  }
  & i {
    cursor: pointer;
  }
  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
    & label {
      margin-left: 10px;
    }
  }
  & > div:nth-child(2) {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    & div:nth-child(2) {
      margin-right: 10px;
      margin-left: 10px;
    }
  }
`;

export const ContainerSectionTwo = styled.div`
  height: calc(100% - 60px);
  background-color: var(--color-white);
  position: relative;
  & > div:nth-child(1) {
    position: relative;
    border-bottom: 0.5px solid var(--color-three);
    padding: 10px;

    & input {
      background: var(--color-one);
      width: 100%;
      border-radius: 8px;
      border: none;
      height: 35px;
      padding-left: 50px;
      padding-right: 10px;
      font-size: 13px;
    }

    & i {
      position: absolute;
      top: 22px;
      left: 20px;
      color: var(--color-two);
      font-weight: 900;
      font-size: 13px;
    }
  }

  & .wrapper-serch-user {
    z-index: 3;
    position: relative;
  }
`;

export const ContainerSectionTwoChats = styled.div`
  height: calc(100% - 60px);
  overflow: auto;
`;
