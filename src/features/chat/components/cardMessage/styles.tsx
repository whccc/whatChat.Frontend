import styled from "styled-components";
import css from "styled-jsx/css";

export const Container = styled.div<{ direction: boolean }>`
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.direction ? "flex-end" : "flex-start")};

  & img {
    border: 1px solid red;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    ${(props) =>
      props.direction
        ? `
            margin-right: 10px;
          `
        : `
            margin-left: 10px;
          `};
  }
`;

export const ContainerMessage = styled.div`
  max-width: 80%;
  background-color: var(--color-white);
  word-wrap: break-word;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;
