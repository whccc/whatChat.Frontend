import styled from "styled-components";

export const WrapperCallUser = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(35 68 82 / 80%);
  z-index: 5;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper-icons-call-user {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & i[aria-label="icon-close"] {
    margin-right: 10px;
    background-color: var(--color-nine);
  }
  & i[aria-label="icon-answer"] {
    background-color: var(--color-ten);
  }
  & i {
    color: #fff;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }

  & h1 {
    color: var(--color-white);
  }
`;
