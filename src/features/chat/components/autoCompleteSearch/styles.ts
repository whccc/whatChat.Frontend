import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50px;
  width: 100%;
  box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
  & ul {
    max-height: 250px;
    overflow: auto;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 3;
    position: relative;
    background-color: #fff;
    & li {
      border-bottom: 0.5px solid var(--color-three);
      display: flex;
      align-items: center;
      padding: 5px;
      & img {
        width: 70px;
        border-radius: 100%;

        margin-right: 10px;
      }
    }
  }

  & div {
    &:after {
      position: fixed;
      content: " ";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
    }
  }
`;
