import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  max-height: 250px;
  top: 50px;
  background-color: #fff;
  width: 100%;
  overflow: auto;
  box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
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
`;
